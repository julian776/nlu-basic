import { Entity } from "../../types/repositories/models/entity.model";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
import { validateEntity } from "../helpers/helpers";

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
  constructor() {
    this.entities = {};
  }

  async getAllEntities(): Promise<Entity[]> {
    const entities = Object.values(this.entities);
    
    return entities 
  }

  async getEntity(intent: string): Promise<Entity> {
    return this.entities[intent]
  }

  async addEntities(entities: Entity[], override=false): Promise<boolean> {
    try {
      const entitiesToAdd = await Promise.all(
        entities.map(async (entity) => {
          validateEntity(entity);
          return entity;
        })
      );
  
      await Promise.all(entitiesToAdd.map((entity) => {
        if (entity) {
          const exists = entity.intent in this.entities
          const isToAdd = !exists || (exists && override)
          
          if (isToAdd) {
            this.entities[entity.intent] = entity;
          }
        }
      }));
      
      return true;
    } catch (err) {
      console.log(err);
      
      return false
    }
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
}
