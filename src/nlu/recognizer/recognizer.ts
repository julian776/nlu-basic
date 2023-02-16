import { Entity, ParamExamples } from "../../types/repositories/models/entity.model";
import { Recognizer } from "../../types/nlu/recognizer/recognizer";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
import { isTheSame } from "./helpers/helpers";
import {
  ParamsResponse,
  ResponseEntity,
  StrictStructError,
} from "./models/entity";

/**
 * Creating a class called RecognizeText that implements the Recognizer interface.
 * @public
 * @class
 * @name RecognizeText
 * @kind class
 * @implements Recognizer
 * @exports
 */
export class RecognizeText implements Recognizer {
  private minConfidence = 0.8;
  private entityRepository!: NluBasicRepository;

  constructor(
    minConfidence = 0.8
  ) {
    this.updateConfidence(minConfidence);
  }

  /**
   * Try to recognize a given text with the database provided by a repository.
   * 
   * @async
   * @method
   * @name recognize
   * @kind method
   * @memberof RecognizeText
   * @param {string} text
   * @param {boolean} strict?
   * @returns {Promise<ResponseEntity | ResponseEntity[]>}
   */
  async recognize(
    text: string,
    strict = false
  ): Promise<ResponseEntity | ResponseEntity[]> {
    const intents = await this.entityRepository.getAllEntities();
    
    if (!intents || intents.length === 0) {
      throw new Error("No intents to compare");
    }

    const possibleAnswers = [];
    let foundedEntity;
    for (let entity of intents) {
      try {
        const intentsStruct = entity.intentsStruct;
        for (let struct of intentsStruct) {
          const compareResult = await this.compare(
            text,
            struct,
            entity.paramExamples,
            strict
          );
          
          if (compareResult.confidence === 1) {
            foundedEntity = new ResponseEntity(
              entity.intent,
              null,
              struct,
              compareResult.params,
              compareResult.confidence
            );
            return foundedEntity;
          }
          if (compareResult.confidence >= this.minConfidence) {
            const possibleEntity = new ResponseEntity(
              entity.intent,
              null,
              struct,
              compareResult.params,
              compareResult.confidence
            );
            possibleAnswers.push(possibleEntity);
          }
        }
      } catch (err: any) {}
    }
    return possibleAnswers
  }

  private async compare(
    text: string,
    intentStruct: string,
    paramsExamples: ParamExamples,
    strict = false
  ): Promise<{ confidence: number; params: ParamsResponse }> {
    const textWords = text.split(" ");
    const structWords = intentStruct.split(" "); // intentStruct.replace(/{[a-zA-Z]}/, '')

    let paramsAcc = {};
    let coincidences = 0;
    const arrayCoincidences = structWords.reduce(
      (acc: boolean[], structWord, currIndx) => {
        const textWord = textWords[currIndx];
        const responseValidated = this.validateWordOrParam(
          structWord,
          textWord,
          paramsExamples,
          paramsAcc
        );
        paramsAcc = responseValidated.paramsAcc;
        if (responseValidated.hasCoincidence) {
          coincidences++;
        } else if (strict) {
          throw new StrictStructError();
        }

        return [...acc, responseValidated.hasCoincidence];
      },
      []
    );

    return {
      confidence: this.checkConfidence(coincidences, arrayCoincidences),
      params: paramsAcc,
    };
  }

  train(entityRepository: NluBasicRepository) {
    if (!entityRepository) {
      throw new Error("Not repository provided");
    }
    this.entityRepository = entityRepository
  }

  private checkConfidence(
    coincidences: number,
    arrayCoincidences: boolean[]
  ): number {
    const confidence = coincidences / arrayCoincidences.length;
    return confidence;
  }

  public updateConfidence(newConfidence: number) {
    if (newConfidence > 1 || newConfidence < 0) {
      throw new Error(
        "Invalid confidence range, min confidence should be between 0 and 1"
      );
    }
    if (newConfidence < 0.4) {
      console.warn(
        "A confidence less than 0.4 can reduce performance, if you like to get params use --- rather than recognize"
      );
    }
    this.minConfidence = newConfidence;
  }

  public getConfidence() {
    return this.minConfidence;
  }

  private validateWordOrParam(
    structWord: string,
    textWord: string,
    paramsExamples: ParamExamples,
    paramsAcc: ParamsResponse
  ) {
    const responseValidated = {
      hasCoincidence: true,
      paramsAcc,
    };
    if (structWord.includes("{") && structWord.includes("}")) {
      const param = structWord.replace(/[\{\}]+/g, "");
      const paramExamples = paramsExamples[param];
      const isParam = this.validateParam(textWord, paramExamples);
      if (isParam) {
        responseValidated.paramsAcc[param] = textWord;
        responseValidated.hasCoincidence = true;
      }
    } else {
      responseValidated.hasCoincidence = isTheSame(textWord, structWord);
    }
    return responseValidated;
  }

  private validateParam(word: string, paramExamples: Array<string>): boolean {
    return paramExamples.includes(word) ? true : false;
  }

  public getDateFromText(text: string): Date {
    return new Date();
  }
}
