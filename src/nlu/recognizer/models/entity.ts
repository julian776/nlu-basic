/**
 * Exporting the class ResponseEntity so that it can be used in other files.
 * 
 * @class
 * @name ResponseEntity
 * @kind class
 * @exports
 */
export class ResponseEntity {
  constructor(
    public intent: string,
    public date: Date | null,
    public intentStruct: string,
    public params: ParamsResponse,
    public confidence: number
  ) {}
}

export type ParamsResponse = {
  [key: string]: string;
};

export class StrictStructError extends Error {
  constructor(message = "Strict assert failed") {
    super(message);
  }
}
