import { ParamExamples } from "../../types/repositories/models/entity.model";
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
   * Takes in a `text` parameter and an optional `strict` parameter.
   * It tries to recognize the given `text` with the database provided
   * by a repository by comparing it with the intent structures stored
   * in the repository.
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
    strict: boolean = false,
    flexMatch = true,
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
            strict,
            flexMatch
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

  /**
   * Takes in the following parameters:
- `text`: a string representing the text to be compared with the intent structure.
- `intentStruct`: a string representing the intent structure to compare the text with.
- `paramsExamples`: an object containing examples of parameters that can be extracted from the text.
- `strict`: a boolean indicating whether the comparison should be strict or not.
   * 
   * @async
   * @method
   * @name compare
   * @kind method
   * @memberof RecognizeText
   * @private
   * @param {string} text
   * @param {string} intentStruct
   * @param {ParamExamples} paramsExamples
   * @param {boolean} strict?
   * @returns {Promise<{ confidence: number; params: ParamsResponse; }>}
   */
  private async compare(
    text: string,
    intentStruct: string,
    paramsExamples: ParamExamples,
    strict: boolean = false,
    flexMatch: boolean = true,
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
          paramsAcc,
          flexMatch
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

  /**
   * Calling the `train` method with a repository object, the 
   * `RecognizeText` instance is trained to recognize intents
   * based on the data in the repository.
   * 
   * @method
   * @name train
   * @kind method
   * @memberof RecognizeText
   * @param {NluBasicRepository} entityRepository
   * @returns {void}
   */
  train(entityRepository: NluBasicRepository): void {
    if (!entityRepository) {
      throw new Error("Not repository provided");
    }
    this.entityRepository = entityRepository
  }

  /**
   * Calculates the confidence level of a recognized intent based
   * on the number of coincidences between the text and the intent
   * structure. It takes in two parameters: `coincidences`, which
   * is the number of words that match between the text and the
   * intent structure, and `arrayCoincidences`, which is an array
   * of boolean values indicating whether each word in the intent
   * structure matches a word in the text. 
   * The method calculates the confidence level by dividing the 
   * number of coincidences by the length of the `arrayCoincidences` 
   * array and returns the result as a number between 0 and 1.
   * 
   * @method
   * @name checkConfidence
   * @kind method
   * @memberof RecognizeText
   * @private
   * @param {number} coincidences
   * @param {boolean[]} arrayCoincidences
   * @returns {number}
   */
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

  /**
   * `private validateWordOrParam(` is a method that validates whether
   * a given word matches a parameter or not. If the word matches a
   * parameter, it adds the parameter and its value to the `paramsAcc`
   * object. If the word does not match a parameter, it checks if the
   * word is the same as the `structWord`. If it is, it returns `true`
   * for `hasCoincidence`, otherwise it returns `false`.
   * 
   * @method
   * @name validateWordOrParam
   * @kind method
   * @memberof RecognizeText
   * @private
   * @param {string} structWord
   * @param {string} textWord
   * @param {ParamExamples} paramsExamples
   * @param {ParamsResponse} paramsAcc
   * @returns {{ hasCoincidence: boolean; paramsAcc: ParamsResponse; }}
   */
  private validateWordOrParam(
    structWord: string,
    textWord: string,
    paramsExamples: ParamExamples,
    paramsAcc: ParamsResponse,
    flexMatch: boolean
  ): { hasCoincidence: boolean; paramsAcc: ParamsResponse; } {
    const responseValidated = {
      hasCoincidence: true,
      paramsAcc,
    };
    const params = structWord.match(/\{.+\}+/g)
    if (params) {
      const param = params[0]
      const paramExamples = paramsExamples[param.replace(/[{}]+/g, "")];
      
      if (flexMatch && textWord) {
        textWord = textWord.replace(/[?<>*&^#@!$()-+./`~,=_|[\]]/, '')
      }
      const isParam = this.validateParam(textWord, paramExamples);
      if (isParam) {
        responseValidated.paramsAcc[param.replace(/[{}]+/g, "")] = textWord;
        responseValidated.hasCoincidence = true;
      }
    } else {
      responseValidated.hasCoincidence = isTheSame(textWord, structWord);
    }
    return responseValidated;
  }

  /**
   * Helper function used by
   * the `compare` method to validate whether a given word matches a
   * parameter or not. It takes in a `word` parameter, which is the
   * word to be validated, and a `paramExamples` parameter, which is
   * an array of examples of valid parameter values.
   * The method checks if the `word` parameter is included in the
   * `paramExamples` array and returns `true` if it is, and `false` otherwise.
   * This method is used to determine if a word in the text being compared
   * matches a parameter in the intent structure.
   * 
   * @method
   * @name validateParam
   * @kind method
   * @memberof RecognizeText
   * @private
   * @param {string} word
   * @param {Array<string>} paramExamples
   * @returns {boolean}
   */
  private validateParam(word: string, paramExamples: Array<string>): boolean {
    if (!paramExamples) return false
    
    return paramExamples.includes(word) ? true : false;
  }

  public getDateFromText(text: string): Date {
    return new Date();
  }
}
