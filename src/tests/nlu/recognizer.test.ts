import { RecognizeText } from "../../nlu/recognizer/recognizer";
import { Entity } from "../../types/repositories/models/entity.model";

const { NluBasicMongoRepository } = jest.createMockFromModule<
  typeof import("../../repositories/mongo/nlu-mongo.repository")
>("../../repositories/mongo/nlu-mongo.repository");

describe("Recognizer test", () => {
  afterAll(() => {
    //jest.spyOn()
  });

  test("Should throw error on invalid range", async () => {
    const entityRepository = new NluBasicMongoRepository("uriTest");
    const recognizer = new RecognizeText();
    recognizer.train(entityRepository);

    NluBasicMongoRepository.prototype.getAllEntities = jest.fn(() =>
      Promise.resolve([])
    );

    try {
      await recognizer.recognize("test");
    } catch (err: any) {
      expect(err).toMatchObject(new Error("No intents to compare"));
      expect(err.message).toBe("No intents to compare");
    }
  });

  test("compare", async () => {
    const text = "I need shirts info";
    const struct = "{pronoun} {need} shirts {info}";
    const params = {
      pronoun: ["I", "me"],
      need: ["need", "like"],
      info: ["info", "information", "brochure", "pdf"],
    };
    NluBasicMongoRepository.prototype.getAllEntities = jest.fn(() =>
      Promise.resolve([new Entity("Info Shirts", [struct], params)])
    );
    
    const entityRepository = new NluBasicMongoRepository("uriTest");
    const recognizer = new RecognizeText();
    recognizer.train(entityRepository);
    const response = await recognizer.recognize(text);

    expect(Array.isArray(response)).toBe(false);
    if (!Array.isArray(response)) {
      expect(response.confidence).toBe(1);
    }
  });
});

describe("Test confidence parameter", () => {
  const invalidRangeString =
    "Invalid confidence range, min confidence should be between 0 and 1";

  test("Should throw error invalid confidence range", () => {
    const entityRepository = new NluBasicMongoRepository("uriTest");
    const recognizer = new RecognizeText();
    recognizer.train(entityRepository);

    expect(() => recognizer.updateConfidence(-1)).toThrowError(
      invalidRangeString
    );
  });

  test("Should fail on invalid range on constructor", () => {
    expect(() => new RecognizeText(1.01)).toThrowError(invalidRangeString);
  });

  test("Should update confidence", () => {
    const entityRepository = new NluBasicMongoRepository("uriTest");
    const recognizer = new RecognizeText();
    recognizer.train(entityRepository);

    recognizer.updateConfidence(0.8);

    expect(recognizer.getConfidence()).toBe(0.8);
  });
});
