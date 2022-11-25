export class ResponseEntity {
  constructor(
    private intent: string,
    private date: Date,
    private params: Object
  ) {}
}

export class StrictStructError extends Error {
  constructor(message='Strict assert failed') {
    super(message)
  }
}
