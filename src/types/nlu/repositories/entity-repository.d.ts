import { Entity } from "../../../nlu/repositories/models/entity.model";

export interface Repository {
    //saveEntity(text: string): Entity;
    getEntities(): Array<Entity>,
  }

export interface IntentsDBClient {
  async addEntity(intent: Array<Entity>): Promise<boolean>
  async addStructs(structs: Array<string>): Promise<boolean>
  async addExample(exampleKey: string, exampleValues :Array<string>): Promise<boolean>
  async appendValuesForExample(exampleKey: string, exampleValues :Array<string>): Promise<boolean>
}