import { Entity } from "../../../nlu/repositories/models/entity.model";

export interface Repository {
    //saveEntity(text: string): Entity;
    getIntentsStructure(): Array<Entity>
  }