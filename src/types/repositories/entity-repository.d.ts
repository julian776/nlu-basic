export interface NluBasicRepository {
  //saveEntity(text: string): Entity;
  getAllEntities(): Promise<Array<Entity>>;
  addEntities(intents: Array<Entity>): Promise<any>;
  addStructs(intent:string, structs: Array<string>): Promise<boolean>;
  addExamples(
    intent:string,
    exampleKey: string,
    exampleValues: Array<string>
  ): Promise<boolean>;
  appendExampleValues(
    exampleKey: string,
    exampleValues: Array<string>
  ): Promise<boolean>;
}
