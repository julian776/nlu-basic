export class ResponseEntity {
  constructor(
    private intent: string,
    private date: Date | null,
    private intentStruct: string,
    private params: ParamsResponse,
    private confidence: number
  ) {}  
}

export type ParamsResponse = {
  [key: string]: string
}

export class StrictStructError extends Error {
  constructor(message='Strict assert failed') {
    super(message)
  }
}
