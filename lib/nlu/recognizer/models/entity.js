"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrictStructError = exports.ResponseEntity = void 0;
/**
 * Exporting the class ResponseEntity so that it can be used in other files.
 *
 * @class
 * @name ResponseEntity
 * @kind class
 * @exports
 */
class ResponseEntity {
    constructor(intent, date, intentStruct, params, confidence) {
        this.intent = intent;
        this.date = date;
        this.intentStruct = intentStruct;
        this.params = params;
        this.confidence = confidence;
    }
}
exports.ResponseEntity = ResponseEntity;
class StrictStructError extends Error {
    constructor(message = "Strict assert failed") {
        super(message);
    }
}
exports.StrictStructError = StrictStructError;
