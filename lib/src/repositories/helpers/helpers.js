"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEntity = exports.IllegalArgumentError = exports.checkArgument = void 0;
const checkArgument = (expression, errorString) => {
    if (!expression) {
        throw new IllegalArgumentError(errorString);
    }
};
exports.checkArgument = checkArgument;
class IllegalArgumentError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.IllegalArgumentError = IllegalArgumentError;
const validateEntity = (entity) => {
    (0, exports.checkArgument)(entity.intent ? true : false, "Not possible to insert a entity with no intent");
    (0, exports.checkArgument)(Array.isArray(entity.intentsStruct), "Intents structs should be an array");
    (0, exports.checkArgument)(entity.intentsStruct.length >= 1, "Entity needs at least one struct");
    (0, exports.checkArgument)(typeof entity.paramExamples === "object", "Param Examples should be an object");
    return true;
};
exports.validateEntity = validateEntity;
//# sourceMappingURL=helpers.js.map