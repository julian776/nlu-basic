import { Entity } from "../../recognizer/models/entity";

export class Intent {
  constructor(private intent: string, private entity: Entity) {}
}
