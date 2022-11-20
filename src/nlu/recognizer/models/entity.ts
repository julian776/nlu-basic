export class ResponseEntity {
  constructor(
    private intent: string,
    private date: Date,
    private params: Object
  ) {}
}
