export interface Recognizer {
    recognize(text: string): Entity;
  }