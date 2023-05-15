"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(
    // eg: novelBooks
    intent, 
    // eg: ["book with {monsters}"]
    intentsStruct, 
    // eg: {monsters: ["big foot", "your sister", "other monster"]}
    paramExamples) {
        this.intent = intent;
        this.intentsStruct = intentsStruct;
        this.paramExamples = paramExamples;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.model.js.map