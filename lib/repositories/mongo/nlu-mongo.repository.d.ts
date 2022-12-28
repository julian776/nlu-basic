import { Entity } from "../../types/repositories/models/entity.model";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
import { InsertManyResult } from "mongodb";
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
export declare class NluBasicMongoRepository implements NluBasicRepository {
    private readonly collection;
    constructor(uri: string, databaseName?: string, collectionName?: string);
    getAllEntities(): Promise<Entity[]>;
    setUp(uri: string, databaseName: string, collectionName: string): import("mongodb").Collection<import("mongodb").Document>;
    addEntities(entities: Entity[]): Promise<InsertManyResult<Document>>;
    addStructs(structs: string[]): Promise<boolean>;
    addExample(exampleKey: string, exampleValues: string[]): Promise<boolean>;
    appendExampleValues(exampleKey: string, exampleValues: string[]): Promise<boolean>;
    private validateEntity;
}
//# sourceMappingURL=nlu-mongo.repository.d.ts.map