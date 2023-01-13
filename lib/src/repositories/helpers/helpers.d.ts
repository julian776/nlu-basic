import { Entity } from "../../../nlu-basic";
export declare const checkArgument: (expression: boolean, errorString: string) => void;
export declare class IllegalArgumentError extends Error {
    constructor(message: string);
}
export declare const validateEntity: (entity: Entity) => boolean;
