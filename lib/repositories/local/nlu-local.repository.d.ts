import { Entity } from "../../types/repositories/models/entity.model";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
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
export declare class NluBasicLocalRepository implements NluBasicRepository {
    private entities;
    constructor(entities: Entity[]);
    getAllEntities(): Promise<Entity[]>;
    setUp(uri: string, databaseName: string, collectionName: string): import("mongodb").Collection<import("mongodb").Document>;
    addEntities(entities: Entity[]): Promise<boolean>;
    addStructs(structs: string[]): Promise<boolean>;
    addExample(exampleKey: string, exampleValues: string[]): Promise<boolean>;
    appendExampleValues(exampleKey: string, exampleValues: string[]): Promise<boolean>;
    private validateEntity;
}
//# sourceMappingURL=nlu-local.repository.d.ts.map