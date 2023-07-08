"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nlu_basic_1 = require("../../../nlu-basic");
const nlu_basic_2 = require("../../../nlu-basic");
describe.only("NluBasicLocalRepository tests", () => {
    let repo = new nlu_basic_1.NluBasicLocalRepository();
    beforeEach(() => {
        repo = new nlu_basic_1.NluBasicLocalRepository();
    });
    test("Should add a entity", async () => {
        const text = "I need shirts info";
        const struct1 = "{pronoun} do {service}";
        const struct2 = "have {service}?";
        const params = {
            pronoun: ["You", ""],
            need: ["need", "like"],
            info: ["info", "information", "brochure", "pdf"],
            service: ["hair", "nails", "skin care"]
        };
        repo.addEntities([new nlu_basic_2.Entity("Services info", [struct1, struct2], params)]);
        const entities = await repo.getAllEntities();
        expect(entities[0]).toBe(new nlu_basic_2.Entity("", [""], {}));
    });
});
//# sourceMappingURL=local.tests.js.map