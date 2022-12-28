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
    recognize(text: string, strict?: boolean): Promise<ResponseEntity | ResponseEntity[]>;
    private compare;
    train(entityRepository: NluBasicRepository): void;
    private checkConfidence;
    updateConfidence(newConfidence: number): void;
    getConfidence(): number;
    private validateWordOrParam;
    private validateParam;
    getDateFromText(text: string): Date;
    private createResponseEntity;
}
//# sourceMappingURL=recognizer.d.ts.map