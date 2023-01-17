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
    constructor() {
        this.entities = {};
    }
    async getAllEntities() {
        const entities = Object.values(this.entities);
        return entities;
    }
    async addEntities(entities) {
        try {
            const entitiesToAdd = await Promise.all(entities.map(async (entity) => {
                (0, helpers_1.validateEntity)(entity);
                return entity;
            }));
            await Promise.all(entitiesToAdd.map((entity) => {
                if (entity) {
                    this.entities[entity.intent] = entity;
                }
            }));
            return true;
        }
        catch (err) {
            return false;
        }
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
}
exports.NluBasicLocalRepository = NluBasicLocalRepository;
//# sourceMappingURL=nlu-local.repository.js.map