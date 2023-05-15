export class Entity {
  constructor(
    // eg: novelBooks
    public readonly intent: string,
    
    // eg: ["book with {monsters}"]
    public intentsStruct: Array<string>,

    // eg: {monsters: ["big foot", "your sister", "other monster"]}
    public paramExamples: ParamExamples
  ) {}
}

export type ParamExamples = {
  [key: string]: Array<string>;
};
