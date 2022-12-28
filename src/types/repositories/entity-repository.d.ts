export interface NluBasicRepository {
  //saveEntity(text: string): Entity;
  getAllEntities(): Promise<Array<Entity>>;
  addEntities(intent: Array<Entity>): Promise<any>;
  addStructs(structs: Array<string>): Promise<boolean>;
  addExample(
    exampleKey: string,
    exampleValues: Array<string>
  ): Promise<boolean>;
  appendExampleValues(
    exampleKey: string,
    exampleValues: Array<string>
  ): Promise<boolean>;
}
