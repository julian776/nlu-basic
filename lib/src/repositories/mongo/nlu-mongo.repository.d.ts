import { Entity } from "../../types/repositories/models/entity.model";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
import { Document, InsertManyResult } from "mongodb";
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
    getAllEntities(): Promise<any>;
    setUp(uri: string, databaseName: string, collectionName: string): import("mongodb").Collection<Document>;
    addEntities(entities: Entity[]): Promise<InsertManyResult<Document>>;
    addStructs(intent: string, structs: string[]): Promise<boolean>;
    addExamples(intent: string, exampleKey: string, exampleValues: string[]): Promise<boolean>;
    appendExampleValues(exampleKey: string, exampleValues: string[]): Promise<boolean>;
}
