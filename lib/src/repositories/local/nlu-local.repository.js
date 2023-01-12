"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NluBasicLocalRepository = void 0;
const helpers_1 = require("../helpers/helpers");
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
class NluBasicLocalRepository {
    constructor(entities) {
        this.entities = {};
        this.addEntities(entities);
    }
    async getAllEntities() {
        return Object.values(this.entities);
    }
    async addEntities(entities) {
        const entitiesToAdd = await Promise.all(entities.map(async (entity) => {
            this.validateEntity(entity);
            return entity;
        }));
        entitiesToAdd.map((entity) => {
            if (entity)
                this.entities[entity.intent] = entity;
        });
        return true;
    }
    async addStructs(intent, structs) {
        const entity = this.entities[intent];
        entity.intentsStruct.push(...structs);
        this.entities[intent] = entity;
        return true;
    }
    async addExamples(intent, exampleKey, exampleValues) {
        const entity = this.entities[intent];
        entity.paramExamples[exampleKey].push(...exampleValues);
        this.entities[intent] = entity;
        return true;
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
exports.NluBasicLocalRepository = NluBasicLocalRepository;
//# sourceMappingURL=nlu-local.repository.js.map