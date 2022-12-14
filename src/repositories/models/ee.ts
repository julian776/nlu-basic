import { Entity } from "./entity.model";

export class Intent {
  constructor(private intent: string, private entity: Entity) {}
}
