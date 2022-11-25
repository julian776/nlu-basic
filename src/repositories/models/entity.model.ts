export class Entity {
  constructor(
    public readonly intent: string, //infoCamisas
    public readonly intentStruct: string, //
    public readonly date: Date | string,
    public readonly params: Params
  ) {}
}

export type Params = {
  [key: string]: Array<string>;
};
