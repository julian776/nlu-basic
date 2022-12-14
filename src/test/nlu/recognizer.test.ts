import { RecognizeText } from "../../nlu/recognizer/recognizer";
import { Entity } from "../../repositories/models/entity.model";
//import { NluBasicMongoRepository } from "../../repositories/nlu-basic.repository";
//jest.mock("../../repositories/nlu-basic.repository");

//let mockedMongoRepository = jest.mock('NluBasicMongoRepository');

// TODO: Clean comments

const { NluBasicMongoRepository } = jest.createMockFromModule<
  typeof import("../../repositories/nlu-basic.repository")
>("../../repositories/nlu-basic.repository");

describe("Recognizer test", () => {
  afterAll(() => {
    //jest.spyOn()
  });

  test("Should throw error on invalid range", async () => {
    const entityRepository = new NluBasicMongoRepository("uriTest");
    const recognizer = new RecognizeText(entityRepository);

    NluBasicMongoRepository.prototype.getAllEntities = jest.fn(() =>
      Promise.resolve([])
    );

    
      try {
        await recognizer.recognize("test")
      } catch (err: any) {
        expect(err).toMatchObject(new Error("No intents to compare"))
        expect(err.message).toBe("No intents to compare")
      }
    
  });

  test("compare", async () => {
    const text = "Oe necesito saber si venden camisas pero no se si sea cierto";
    const struct = "{greet} {need} saber si {sell} camisas";
    const params = {
      greet: ["Buenas", "Hola", "Holi", "Oe"],
      need: ["necesito", "quiero", "tienen"],
      sell: ["venden"],
    };
    NluBasicMongoRepository.prototype.getAllEntities = jest.fn(() =>
      Promise.resolve([new Entity("Info Shirts", [struct], params)])
    );
    //jest.spyOn(mockedMongoRepository, 'getAllEntities').mockImplementation();

    const entityRepository = new NluBasicMongoRepository("uriTest");
    const recognizer = new RecognizeText(entityRepository);
    const response = await recognizer.recognize(text);
    
    expect(Array.isArray(response)).toBe(false)
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
    const recognizer = new RecognizeText(entityRepository);

    expect(() => recognizer.updateConfidence(-1)).toThrowError(
      invalidRangeString
    );
  });

  test("Should fail on invalid range on constructor", () => {
    const entityRepository = new NluBasicMongoRepository("uriTest");

    expect(() => new RecognizeText(entityRepository, 1.01)).toThrowError(
      invalidRangeString
    );
  });

  test("Should update confidence", () => {
    const entityRepository = new NluBasicMongoRepository("uriTest");
    const recognizer = new RecognizeText(entityRepository);

    recognizer.updateConfidence(0.8);

    expect(recognizer.getConfidence()).toBe(0.8);
  });
});
