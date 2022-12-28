import { Entity } from "../../types/repositories/models/entity.model";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
import { InsertManyResult, MongoClient } from "mongodb";
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
export class NluBasicLocalRepository implements NluBasicRepository {
  private entities: Entity[]
    constructor(entities: Entity[]) {
        this.entities = []
        this.addEntities(entities)
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

  async addEntities(entities: Entity[]): Promise<boolean> {
    const entitiesToAdd = await Promise.all(
      entities.map(async (entity) => {
        this.validateEntity(entity);
        return entity;
      })
    );
    this.entities = entitiesToAdd
    return true
  }
  
  addStructs(structs: string[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  addExample(exampleKey: string, exampleValues: string[]): Promise<boolean> {
    throw new Error("Method not implemented.");
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
