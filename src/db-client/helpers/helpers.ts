export const checkArgument = (expression: boolean, errorString:string) => {
  if (!expression) {
    throw new IllegalArgumentError(errorString);
  }
};

export class IllegalArgumentError extends Error {
    constructor(message: string) {
      super(message);
    }
  }
