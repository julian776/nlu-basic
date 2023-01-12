export declare const checkArgument: (expression: boolean, errorString: string) => void;
export declare class IllegalArgumentError extends Error {
    constructor(message: string);
}
