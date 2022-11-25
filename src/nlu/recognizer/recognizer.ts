import { Entity, Params } from "../../repositories/models/entity.model";
import { Recognizer } from "../../types/nlu/recognizer/recognizer";
import { Repository } from "../../types/nlu/repositories/entity-repository";
import { isTheSame } from "./helpers/helpers";
import { StrictStructError } from "./models/entity";

export class RecognizeText implements Recognizer {
  constructor(private entityRepository: Repository) {}

  async recognize(text: string, strict = false): Promise<Entity | undefined> {
    const intentsStructure = this.entityRepository.getIntentsStructure();

    const entity = await Promise.race(
      intentsStructure.map(async (entity) => {
        try {
          const intentStruct = entity.intentStruct;
          const confidence = await this.compare(
            text,
            intentStruct,
            entity.paramsExamples,
            strict
          );
          if (confidence === 1) {
            return Promise.resolve(
              new Entity("df", "fghfdfgdf", new Date(), {
                dfg: ["fgfg"],
                fgb: ["sfddf"],
              })
            );
          }
        } catch (err) {}
      })
    );
    if (entity) {
      return entity;
    }
  }

  public async compare(
    text: string,
    intentStruct: string,
    paramsExamples: Params,
    strict = false
  ): Promise<number> {
    const textWords = text.split(" ");
    const structWords = intentStruct.split(" "); // intentStruct.replace(/{[a-zA-Z]}/, '')

    let coincidences = 0;
    const arrayCoincidences = structWords.reduce(
      (acc: boolean[], structWord, currIndx) => {
        const textWord = textWords[currIndx];
        const wordHasCoincidence = this.validateWordOrParam(
          structWord,
          textWord,
          paramsExamples
        );
        if (wordHasCoincidence) {
          coincidences++;
        } else if (strict) {
          throw new StrictStructError();
        }

        return [...acc, wordHasCoincidence];
      },
      []
    );

    return this.checkConfidence(coincidences, arrayCoincidences);
  }

  private checkConfidence(
    coincidences: number,
    arrayCoincidences: boolean[]
  ): number {
    const confidence = coincidences / arrayCoincidences.length;
    return confidence;
  }

  private validateWordOrParam(
    structWord: string,
    textWord: string,
    paramsExamples: Params
  ) {
    if (structWord.includes("{") && structWord.includes("}")) {
      const param = structWord.replace(/[\{\}]+/g, "");
      const paramExample = paramsExamples[param];
      return this.validateParam(textWord, paramExample);
    }
    return isTheSame(textWord, structWord);
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
