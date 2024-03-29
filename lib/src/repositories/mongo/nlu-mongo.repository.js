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
    async getAllEntities() {
        return this.collection.find({}).toArray();
    }
    setUp(uri, databaseName, collectionName) {
        const client = new mongodb_1.MongoClient(uri);
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        return collection;
    }
    async addEntities(entities) {
        const entitiesToAdd = await Promise.all(entities.map(async (entity) => {
            (0, helpers_1.validateEntity)(entity);
            return entity;
        }));
        return this.collection?.insertMany(entitiesToAdd);
    }
    async addStructs(intent, structs) {
        const entity = await this.collection.findOne({ intent });
        if (entity) {
            entity.intentsStruct.push(...structs);
            this.collection.updateOne({ _id: new mongodb_1.ObjectId(entity._id) }, { $push: { intentsStruct: entity.intentsStruct } }, { upsert: true });
            return true;
        }
        return false;
    }
    async addExamples(intent, exampleKey, exampleValues) {
        const entity = await this.collection.findOne({ intent });
        if (entity) {
            entity.paramExamples[exampleKey].push(...exampleValues);
            this.collection.updateOne({ _id: new mongodb_1.ObjectId(entity._id) }, { $set: { paramExamples: entity.paramExamples } }, { upsert: true });
            return true;
        }
        return false;
    }
    appendExampleValues(exampleKey, exampleValues) {
        throw new Error("Method not implemented.");
    }
}
exports.NluBasicMongoRepository = NluBasicMongoRepository;
//# sourceMappingURL=nlu-mongo.repository.js.map