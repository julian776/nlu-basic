import { Entity } from "../../types/repositories/models/entity.model";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
import { Document, InsertManyResult, MongoClient, ObjectId } from "mongodb";
import { validateEntity } from "../helpers/helpers";

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

  async getAllEntities(): Promise<any> {
    return this.collection.find({}).toArray();
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
        validateEntity(entity);
        return entity;
      })
    );
    return this.collection?.insertMany(entitiesToAdd);
  }
  async addStructs(intent: string, structs: string[]): Promise<boolean> {
    const entity = await this.collection.findOne({ intent });
    if (entity) {
      entity.intentsStruct.push(...structs);
      this.collection.updateOne(
        { _id: new ObjectId(entity._id) },
        { $push: { intentsStruct: entity.intentsStruct } },
        { upsert: true }
      );
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
      
      this.collection.updateOne(
        { _id: new ObjectId(entity._id) },
        { $set: { paramExamples: entity.paramExamples } },
        { upsert: true }
      );
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
}
