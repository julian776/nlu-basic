import { Repository } from "../types/nlu/repositories/entity-repository";
import { Entity } from "./models/entity.model";

export class EntityRepository implements Repository {
  constructor(private intentsDB: Object, intents: Array<string>) {}

  getIntents() {
    return [
      new Entity("df", ["fghfdfgdf"], {
        dfg: ["fgfg"],
        fgb: ["sfddf"],
      }),
    ];
  }
}
