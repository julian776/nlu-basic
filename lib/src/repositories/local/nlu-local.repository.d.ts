import { Entity } from "../../types/repositories/models/entity.model";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
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
export declare class NluBasicLocalRepository implements NluBasicRepository {
    private entities;
    constructor(entities: Entity[]);
    getAllEntities(): Promise<Entity[]>;
    addEntities(entities: Entity[]): Promise<boolean>;
    addStructs(intent: string, structs: string[]): Promise<boolean>;
    addExamples(intent: string, exampleKey: string, exampleValues: string[]): Promise<boolean>;
    appendExampleValues(exampleKey: string, exampleValues: string[]): Promise<boolean>;
}
