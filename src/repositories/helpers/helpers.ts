import { Entity } from "../../../nlu-basic";

export const checkArgument = (expression: boolean, errorString: string) => {
  if (!expression) {
    throw new IllegalArgumentError(errorString);
  }
};

export class IllegalArgumentError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const validateEntity = (entity: Entity) => {
  checkArgument(
    entity.intent ? true : false,
    "Not possible to insert a entity with no intent"
  );
  checkArgument(
    Array.isArray(entity.intentsStruct),
    "Intents structs should be an array"
  );
  checkArgument(
    entity.intentsStruct.length >= 1,
    "Entity needs at least one struct"
  );
  checkArgument(
    typeof entity.paramExamples === "object",
    "Param Examples should be an object"
  );
  return true;
};
