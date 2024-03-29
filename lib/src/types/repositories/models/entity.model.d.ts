export declare class Entity {
    readonly intent: string;
    intentsStruct: Array<string>;
    paramExamples: ParamExamples;
    constructor(intent: string, intentsStruct: Array<string>, paramExamples: ParamExamples);
}
export type ParamExamples = {
    [key: string]: Array<string>;
};
