import { NluBasicLocalRepository, Entity } from "../../../nlu-basic";

describe.only("NluBasicLocalRepository tests", () => {
  let repo = new NluBasicLocalRepository();

  beforeEach(() => {
    repo = new NluBasicLocalRepository();
  });

  test("Should add a entity", async () => {
    const struct1 = "{pronoun} do {service}";
    const struct2 = "have {service}?";
    const params = {
      pronoun: ["You", ""],
      service: ["hair", "nails", "skin care"]
    };

    await repo.addEntities([new Entity("Services info", [struct1, struct2], params)]);

    const entities = await repo.getAllEntities()

    expect(entities[0]).toStrictEqual<Entity>(new Entity("Services info", [struct1, struct2], params))
  });

  test("Should no add entity with default override", async () => {
    const struct1 = "{pronoun} do {service}";
    const struct2 = "have {service}?";
    const params = {
      pronoun: ["You", ""],
      service: ["hair", "nails", "skin care"]
    };

    await repo.addEntities([new Entity("Services info", [struct1, struct2], params)]);

    // Should not override since "Services info" is already added
    await repo.addEntities([new Entity("Services info", ["struct placeholder"], {})]);

    const entity = await repo.getEntity("Services info")

    expect(entity).toStrictEqual<Entity>(new Entity("Services info", [struct1, struct2], params))
  });

  test("Should add entity with override", async () => {
    const struct1 = "{pronoun} do {service}";
    const struct2 = "have {service}?";
    const params = {
      pronoun: ["You", ""],
      service: ["hair", "nails", "skin care"]
    };

    await repo.addEntities([new Entity("Services info", [struct1, struct2], params)]);

    // Should override since "Services info" is already added
    const entityToOverride = new Entity("Services info", ["struct placeholder"], {})
    await repo.addEntities([entityToOverride], true);

    const entity = await repo.getEntity("Services info")

    expect(entity).toStrictEqual<Entity>(entityToOverride)
  });

  test("should addExamples", async () => {
    const struct = "have {service}?";
    const params = {
      pronoun: ["You", ""],
      service: ["hair", "nails", "skin care"]
    };

    await repo.addEntities([new Entity("Services info", [struct], params)]);

    await repo.addExamples("Services info", "service", ["bronzer"])

    const entities = await repo.getAllEntities()

    const paramsExpected = {
      pronoun: ["You", ""],
      service: ["hair", "nails", "skin care", "bronzer"]
    };
    expect(entities[0]).toStrictEqual<Entity>(new Entity("Services info", [struct], paramsExpected))
  })

  test("should addStructs", async () => {
    const struct = "have {service}?";
    const params = {
      pronoun: ["You", ""],
      service: ["hair", "nails", "skin care"]
    };

    await repo.addEntities([new Entity("Services info", [struct], params)]);

    const structToAdd = "I would like to schedule a {service}"
    await repo.addStructs("Services info", [structToAdd])

    const entities = await repo.getAllEntities()

    expect(entities[0]).toStrictEqual<Entity>(new Entity("Services info", [struct, structToAdd], params))
  })
});
