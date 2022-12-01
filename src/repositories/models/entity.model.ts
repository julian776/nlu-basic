export class Entity {
  constructor(
    public readonly intent: string, //infoCamisas
    public intentsStruct: Array<string>, //
    public paramExamples: ParamExamples
  ) {}

  addIntentsStruct(structs: Array<string>) {
    this.intentsStruct = [...this.intentsStruct, ...structs]
  }
}

export type ParamExamples = {
  [key: string]: Array<string>;
};
