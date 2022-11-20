import { Repository } from "../../types/nlu/repositories/entity-repository";

export class EntityRepository implements Repository {
    constructor(private intentsDB: Object, intents: Array<string>) {}
    
    getIntents() {
        return [
            "getDate"
        ]
    }
    
}