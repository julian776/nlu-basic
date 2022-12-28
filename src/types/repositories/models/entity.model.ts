export class Entity {
  constructor(
    public readonly intent: string, //infoCamisas
    public intentsStruct: Array<string>, //
    public paramExamples: ParamExamples
  ) {}
}

export type ParamExamples = {
  [key: string]: Array<string>;
};
