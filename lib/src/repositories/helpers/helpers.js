"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalArgumentError = exports.checkArgument = void 0;
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
//# sourceMappingURL=helpers.js.map