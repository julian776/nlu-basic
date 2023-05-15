import { Recognizer } from "../../types/nlu/recognizer/recognizer";
import { NluBasicRepository } from "../../types/repositories/entity-repository";
import { ResponseEntity } from "./models/entity";
/**
 * Creating a class called RecognizeText that implements the Recognizer interface.
 * @public
 * @class
 * @name RecognizeText
 * @kind class
 * @implements Recognizer
 * @exports
 */
export declare class RecognizeText implements Recognizer {
    private minConfidence;
    private entityRepository;
    constructor(minConfidence?: number);
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
    recognize(text: string, strict?: boolean): Promise<ResponseEntity | ResponseEntity[]>;
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
    private compare;
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
    train(entityRepository: NluBasicRepository): void;
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
    private checkConfidence;
    updateConfidence(newConfidence: number): void;
    getConfidence(): number;
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
    private validateWordOrParam;
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
    private validateParam;
    getDateFromText(text: string): Date;
}
