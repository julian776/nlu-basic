"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nlu_basic_1 = require("../../../nlu-basic");
describe("Full example test", () => {
    test.only("Full example test should pass", async () => {
        const text = "I need shirts info";
        const struct = "{pronoun} {need} shirts {info}";
        const params = {
            pronoun: ["I", "me"],
            need: ["need", "like"],
            info: ["info", "information", "brochure", "pdf"],
        };
        // Repo
        const entity = new nlu_basic_1.Entity("Info Shirts", [struct], params);
        //console.log(!entity.intent);
        const entityRepository = new nlu_basic_1.NluBasicLocalRepository();
        await entityRepository.addEntities([entity]);
        // Recognizer
        const recognizer = new nlu_basic_1.RecognizeText();
        recognizer.train(entityRepository);
        const response = await recognizer.recognize(text);
        if (Array.isArray(response)) {
            response.map(entity => console.log(entity));
        }
        else {
            console.log(response);
        }
    });
});
//# sourceMappingURL=examples.test.js.map