import { Entity } from "../repositories/models/entity.model";
import { IntentsDBClient } from "../types/nlu/repositories/entity-repository";


export class DbMongoClient implements IntentsDBClient {
    addEntity(intent: Entity[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    addStructs(structs: string[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    addExample(exampleKey: string, exampleValues: string[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    appendValuesForExample(exampleKey: string, exampleValues: string[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}