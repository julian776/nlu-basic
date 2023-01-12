"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recognizer_1 = require("../../nlu/recognizer/recognizer");
const entity_model_1 = require("../../types/repositories/models/entity.model");
//import { NluBasicMongoRepository } from "../../repositories/nlu-basic.repository";
//jest.mock("../../repositories/nlu-basic.repository");
//let mockedMongoRepository = jest.mock('NluBasicMongoRepository');
// TODO: Clean comments
const { NluBasicMongoRepository } = jest.createMockFromModule("../../repositories/nlu-basic.repository");
describe("Recognizer test", () => {
    afterAll(() => {
        //jest.spyOn()
    });
    test("Should throw error on invalid range", async () => {
        const entityRepository = new NluBasicMongoRepository("uriTest");
        const recognizer = new recognizer_1.RecognizeText();
        recognizer.train(entityRepository);
        NluBasicMongoRepository.prototype.getAllEntities = jest.fn(() => Promise.resolve([]));
        try {
            await recognizer.recognize("test");
        }
        catch (err) {
            expect(err).toMatchObject(new Error("No intents to compare"));
            expect(err.message).toBe("No intents to compare");
        }
    });
    test("compare", async () => {
        const text = "I need shirts info";
        const struct = "{pronoun} {need} shirts {info}";
        const params = {
            greet: ["I", "me"],
            need: ["need", "like"],
            info: ["info", "information", "brochure", "pdf"],
        };
        NluBasicMongoRepository.prototype.getAllEntities = jest.fn(() => Promise.resolve([new entity_model_1.Entity("Info Shirts", [struct], params)]));
        //jest.spyOn(mockedMongoRepository, 'getAllEntities').mockImplementation();
        const entityRepository = new NluBasicMongoRepository("uriTest");
        const recognizer = new recognizer_1.RecognizeText();
        recognizer.train(entityRepository);
        const response = await recognizer.recognize(text);
        expect(Array.isArray(response)).toBe(false);
        if (!Array.isArray(response)) {
            expect(response.confidence).toBe(1);
        }
    });
});
describe("Test confidence parameter", () => {
    const invalidRangeString = "Invalid confidence range, min confidence should be between 0 and 1";
    test("Should throw error invalid confidence range", () => {
        const entityRepository = new NluBasicMongoRepository("uriTest");
        const recognizer = new recognizer_1.RecognizeText();
        recognizer.train(entityRepository);
        expect(() => recognizer.updateConfidence(-1)).toThrowError(invalidRangeString);
    });
    test("Should fail on invalid range on constructor", () => {
        const entityRepository = new NluBasicMongoRepository("uriTest");
        expect(() => new recognizer_1.RecognizeText(1.01)).toThrowError(invalidRangeString);
    });
    test("Should update confidence", () => {
        const entityRepository = new NluBasicMongoRepository("uriTest");
        const recognizer = new recognizer_1.RecognizeText();
        recognizer.train(entityRepository);
        recognizer.updateConfidence(0.8);
        expect(recognizer.getConfidence()).toBe(0.8);
    });
});
//# sourceMappingURL=recognizer.test.js.map