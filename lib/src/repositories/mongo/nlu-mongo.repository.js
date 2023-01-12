"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NluBasicMongoRepository = void 0;
const mongodb_1 = require("mongodb");
const helpers_1 = require("../helpers/helpers");
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
class NluBasicMongoRepository {
    constructor(uri, databaseName = "nlu-basic", collectionName = "entities") {
        this.collection = this.setUp(uri, databaseName, collectionName);
    }
    getAllEntities() {
        throw new Error("Method not implemented.");
    }
    setUp(uri, databaseName, collectionName) {
        const client = new mongodb_1.MongoClient(uri);
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        return collection;
    }
    async addEntities(entities) {
        const entitiesToAdd = await Promise.all(entities.map(async (entity) => {
            this.validateEntity(entity);
            return entity;
        }));
        return this.collection?.insertMany(entitiesToAdd);
    }
    async addStructs(intent, structs) {
        const entity = await this.collection.findOne({ intent });
        if (entity) {
            entity.intentsStruct.push(...structs);
            this.collection.updateOne({ entity }, { entity });
            return true;
        }
        return false;
    }
    async addExamples(intent, exampleKey, exampleValues) {
        const entity = await this.collection.findOne({ intent });
        if (entity) {
            entity.paramExamples[exampleKey].push(...exampleValues);
            this.collection.updateOne({ entity }, { entity });
            return true;
        }
        return false;
    }
    appendExampleValues(exampleKey, exampleValues) {
        throw new Error("Method not implemented.");
    }
    validateEntity(entity) {
        (0, helpers_1.checkArgument)(!entity.intent, "Not possible to insert a entity with no intent");
        (0, helpers_1.checkArgument)(typeof entity.intentsStruct !== "object", "Intents structs should be an array");
        (0, helpers_1.checkArgument)(entity.intentsStruct.length < 1, "Entity needs at least one struct");
        (0, helpers_1.checkArgument)(typeof entity.paramExamples === "object", "Param Examples should be an object");
        return true;
    }
}
exports.NluBasicMongoRepository = NluBasicMongoRepository;
//# sourceMappingURL=nlu-mongo.repository.js.map