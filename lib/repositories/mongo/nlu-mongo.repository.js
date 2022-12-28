"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    addEntities(entities) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const entitiesToAdd = yield Promise.all(entities.map((entity) => __awaiter(this, void 0, void 0, function* () {
                this.validateEntity(entity);
                return entity;
            })));
            return (_a = this.collection) === null || _a === void 0 ? void 0 : _a.insertMany(entitiesToAdd);
        });
    }
    addStructs(structs) {
        throw new Error("Method not implemented.");
    }
    addExample(exampleKey, exampleValues) {
        throw new Error("Method not implemented.");
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
