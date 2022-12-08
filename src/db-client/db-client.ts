import { Entity } from "../repositories/models/entity.model";
import { IntentsDBClient } from "../types/repositories/entity-repository";
import { InsertManyResult, MongoClient } from "mongodb";
import { checkArgument } from "./helpers/helpers";

export class NluBasicMongoClient implements IntentsDBClient {
  private readonly collection;
  constructor(
    uri: string,
    databaseName = "nlu-basic",
    collectionName = "entities"
  ) {
    this.collection = this.setUp(uri, databaseName, collectionName);
  }

  setUp(uri: string, databaseName: string, collectionName: string) {
    const client = new MongoClient(uri);
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    return collection;
  }

  async addEntities(entities: Entity[]): Promise<InsertManyResult<Document>> {
    const entitiesToAdd = await Promise.all(entities.map(async entity => {
        this.validateEntity(entity)
        return entity
    }))
    return this.collection?.insertMany(entitiesToAdd);
  }
  addStructs(structs: string[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  addExample(exampleKey: string, exampleValues: string[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  appendValuesForExample(
    exampleKey: string,
    exampleValues: string[]
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  validateEntity(entity: Entity) {
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
