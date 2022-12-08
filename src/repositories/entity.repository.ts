import { IntentsDBClient, Repository } from "../types/repositories/entity-repository";
import { Entity } from "./models/entity.model";

export class EntityRepository implements Repository {
  constructor(private readonly intentsDBClient: IntentsDBClient) {}

  getEntities() {
    return [
      new Entity("df", ["fghfdfgdf"], {
        dfg: ["fgfg"],
        fgb: ["sfddf"],
      }),
    ];
  }
}
