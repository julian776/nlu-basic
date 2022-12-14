export interface Recognizer {
  recognize(text: string): Promise<Entity>;
}
