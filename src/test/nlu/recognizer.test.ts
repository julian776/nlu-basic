import { DbMongoClient } from "../../db-client/db-client";
import { RecognizeText } from "../../nlu/recognizer/recognizer";
import { EntityRepository } from "../../repositories/entity.repository";

jest.mock('../../repositories/entity.repository');
jest.mock('../../db-client/db-client')

describe("Recognizer test", () => {

  afterAll(() => {
    //jest.spyOn()
  })

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks()
  });

  test.skip("Should throw error on invalid range", () => {
    const entityRepository = new EntityRepository(new DbMongoClient())
    const recognizer = new RecognizeText(entityRepository);
    recognizer.recognize("as");
    expect(true).toBe(true);
  });

  test.skip("compare", async () => { // TODO: Complete test
    const text = "Oe necesito saber si venden camisas pero no se si sea cierto";
    const struct = "{greet} {need} saber si {sell} camisas";
    const params = {
      greet: ["Buenas", "Hola", "Holi", "Oe"],
      need: ["necesito", "quiero", "tienen"],
      sell: ["venden"],
    };

    const entityRepository = new EntityRepository(new DbMongoClient())
    const recognizer = new RecognizeText(entityRepository);
    const confidence = await recognizer.compare(text, struct, params);
    expect(confidence).toBe(1);
  });
});

describe("Test confidence parameter", () => {
  const invalidRangeString =
    "Invalid confidence range, min confidence should be between 0 and 1";

  test("Should throw error invalid confidence range", () => {
    const entityRepository = new EntityRepository(new DbMongoClient())
    const recognizer = new RecognizeText(entityRepository);

    expect(() => recognizer.updateConfidence(-1)).toThrowError(
      invalidRangeString
    );
  });

  test("Should fail on invalid range on constructor", () => {
    const entityRepository = new EntityRepository(new DbMongoClient())
    
    expect(() => new RecognizeText(entityRepository, 1.01)).toThrowError(
      invalidRangeString
    );
  });

  test("Should update confidence", () => {
    const entityRepository = new EntityRepository(new DbMongoClient())
    const recognizer = new RecognizeText(entityRepository);

    recognizer.updateConfidence(0.8);

    expect(recognizer.getConfidence()).toBe(0.8);
  });
});
