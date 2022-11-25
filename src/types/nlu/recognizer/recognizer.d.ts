export interface Recognizer {
    async recognize(text: string): Promise<Entity>;
  }