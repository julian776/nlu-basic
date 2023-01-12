import { Entity } from "../../types/repositories/models/entity.model";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
import { Document, InsertManyResult, MongoClient } from "mongodb";
import { checkArgument } from "../helpers/helpers";

/**
 * Creating a class that implements the NluBasicRepository interface.
 *
 * @public
 * @class
 * @name NluBasicMongoRepository
 * @kind class
 * @implements NluBasicRepository
 * @exports
 */
export class NluBasicMongoRepository implements NluBasicRepository {
  private readonly collection;
  constructor(
    uri: string,
    databaseName = "nlu-basic",
    collectionName = "entities"
  ) {
    this.collection = this.setUp(uri, databaseName, collectionName);
  }

  getAllEntities(): Promise<Entity[]> {
    throw new Error("Method not implemented.");
  }

  setUp(uri: string, databaseName: string, collectionName: string) {
    const client = new MongoClient(uri);
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    return collection;
  }

  async addEntities(entities: Entity[]): Promise<InsertManyResult<Document>> {
    const entitiesToAdd = await Promise.all(
      entities.map(async (entity) => {
        this.validateEntity(entity);
        return entity;
      })
    );
    return this.collection?.insertMany(entitiesToAdd);
  }
  async addStructs(intent: string, structs: string[]): Promise<boolean> {
    const entity = await this.collection.findOne({ intent });
    if (entity) {
      entity.intentsStruct.push(...structs);
      this.collection.updateOne({ entity }, { entity });
      return true;
    }
    return false;
  }

  async addExamples(
    intent: string,
    exampleKey: string,
    exampleValues: string[]
  ): Promise<boolean> {
    const entity = await this.collection.findOne({ intent });
    if (entity) {
      entity.paramExamples[exampleKey].push(...exampleValues);
      this.collection.updateOne({entity}, {entity})
      return true;
    }
    return false;
  }

  appendExampleValues(
    exampleKey: string,
    exampleValues: string[]
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  private validateEntity(entity: Entity) {
    checkArgument(
      !entity.intent,
      "Not possible to insert a entity with no intent"
    );
    checkArgument(
      typeof entity.intentsStruct !== "object",
      "Intents structs should be an array"
    );
    checkArgument(
      entity.intentsStruct.length < 1,
      "Entity needs at least one struct"
    );
    checkArgument(
      typeof entity.paramExamples === "object",
      "Param Examples should be an object"
    );
    return true;
  }
}
