import { Recognizer } from "../../types/nlu/recognizer/recognizer";
import { Repository } from "../../types/nlu/repositories/entity-repository";
import { Entity } from "./models/entity";

export class RecognizeText implements Recognizer {
  
  constructor(private entityRepository: Repository) {}

  recognize(text: string): Entity {
    const intents = this.entityRepository.getIntents()
    
  }
}
