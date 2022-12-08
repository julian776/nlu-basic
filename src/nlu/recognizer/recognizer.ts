import { Entity, ParamExamples } from "../../repositories/models/entity.model";
import { Recognizer } from "../../types/nlu/recognizer/recognizer";
import { Repository } from "../../types/repositories/entity-repository";
import { isTheSame } from "./helpers/helpers";
import {
  ParamsResponse,
  ResponseEntity,
  StrictStructError,
} from "./models/entity";

export class RecognizeText implements Recognizer {
  private minConfidence = 0.8;

  constructor(private entityRepository: Repository, minConfidence = 0.8) {
    this.updateConfidence(minConfidence);
    if (!entityRepository) {
      throw new Error("Not repository provided");
    }
  }

  async recognize(
    text: string,
    strict = false
  ): Promise<ResponseEntity | undefined> {
    const intents = this.entityRepository.getEntities();
    if (!intents) {
      throw new Error("No intents to compare");
    }

    const possibleAnswers = [];
    let foundedEntity;
    intents.map(async (entity: Entity) => {
      try {
        const intentsStruct = entity.intentsStruct;
        foundedEntity = await Promise.race(
          intentsStruct.map(async (struct) => {
            const compareResult = await this.compare(
              text,
              struct,
              entity.paramExamples,
              strict
            );
            if (compareResult.confidence === 1) {
              return Promise.resolve(
                new ResponseEntity(
                  entity.intent,
                  null,
                  struct,
                  compareResult.params,
                  compareResult.confidence
                )
              );
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
              return;
            }
          })
        );
      } catch (err) {}
    });

    if (foundedEntity) {
      return foundedEntity;
    }
  }

  public async compare(
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
      const paramExample = paramsExamples[param];
      const isParam = this.validateParam(textWord, paramExample);
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

  private createResponseEntity(intent: string) {
    //return new Entity()
  }
}

// const paramsWithIndex = structWords.reduce((acc, currWord, index) => {
//   if (currWord.includes('{') && currWord.includes('}')) {
//     const param = currWord.replace(/[\{\}]+/g, '')
//     return [...acc, [param, index]]
//   }
//   return acc
// }, <any>[])
// console.log(paramsWithIndex)
