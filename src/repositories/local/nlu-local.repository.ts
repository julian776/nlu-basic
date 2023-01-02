import { Entity } from "../../types/repositories/models/entity.model";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
import { InsertManyResult, MongoClient } from "mongodb";
import { checkArgument } from "../helpers/helpers";

/**
 * Entity local repository.
 *
 * @public
 * @class
 * @name NluBasicMongoRepository
 * @kind class
 * @implements NluBasicRepository
 * @exports
 */
export class NluBasicLocalRepository implements NluBasicRepository {
  private entities: { [key: string]: Entity };
  constructor(entities: Entity[]) {
    this.entities = {};
    this.addEntities(entities);
  }

  async getAllEntities(): Promise<Entity[]> {
    return Object.values(this.entities);
  }

  async addEntities(entities: Entity[]): Promise<boolean> {
    const entitiesToAdd = await Promise.all(
      entities.map(async (entity) => {
        this.validateEntity(entity);
        return entity;
      })
    );

    entitiesToAdd.map((entity) => {
      if (entity) this.entities[entity.intent] = entity;
    });
    return true;
  }

  async addStructs(intent: string, structs: string[]): Promise<boolean> {
    const entity = this.entities[intent]
    entity.intentsStruct.push(...structs)
    this.entities[intent] = entity
    return true
  }

  async addExamples(
    intent: string,
    exampleKey: string,
    exampleValues: string[]
  ): Promise<boolean> {
    const entity = this.entities[intent]
    entity.paramExamples[exampleKey].push(...exampleValues)
    this.entities[intent] = entity
    return true
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
