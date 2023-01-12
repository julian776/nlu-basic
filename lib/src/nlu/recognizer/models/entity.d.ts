/**
 * Exporting the class ResponseEntity so that it can be used in other files.
 *
 * @class
 * @name ResponseEntity
 * @kind class
 * @exports
 */
export declare class ResponseEntity {
    intent: string;
    date: Date | null;
    intentStruct: string;
    params: ParamsResponse;
    confidence: number;
    constructor(intent: string, date: Date | null, intentStruct: string, params: ParamsResponse, confidence: number);
}
export type ParamsResponse = {
    [key: string]: string;
};
export declare class StrictStructError extends Error {
    constructor(message?: string);
}
