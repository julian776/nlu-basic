"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecognizeText = void 0;
const helpers_1 = require("./helpers/helpers");
const entity_1 = require("./models/entity");
/**
 * Creating a class called RecognizeText that implements the Recognizer interface.
 * @public
 * @class
 * @name RecognizeText
 * @kind class
 * @implements Recognizer
 * @exports
 */
class RecognizeText {
    constructor(minConfidence = 0.8) {
        this.minConfidence = 0.8;
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
    async recognize(text, strict = false) {
        const intents = await this.entityRepository.getAllEntities();
        if (!intents) {
            throw new Error("No intents to compare");
        }
        const possibleAnswers = [];
        let foundedEntity;
        for (let entity of intents) {
            try {
                const intentsStruct = entity.intentsStruct;
                for (let struct of intentsStruct) {
                    const compareResult = await this.compare(text, struct, entity.paramExamples, strict);
                    if (compareResult.confidence === 1) {
                        foundedEntity = new entity_1.ResponseEntity(entity.intent, null, struct, compareResult.params, compareResult.confidence);
                        return foundedEntity;
                    }
                    if (compareResult.confidence >= this.minConfidence) {
                        const possibleEntity = new entity_1.ResponseEntity(entity.intent, null, struct, compareResult.params, compareResult.confidence);
                        possibleAnswers.push(possibleEntity);
                    }
                }
            }
            catch (err) { }
        }
        return possibleAnswers;
    }
    async compare(text, intentStruct, paramsExamples, strict = false) {
        const textWords = text.split(" ");
        const structWords = intentStruct.split(" "); // intentStruct.replace(/{[a-zA-Z]}/, '')
        let paramsAcc = {};
        let coincidences = 0;
        const arrayCoincidences = structWords.reduce((acc, structWord, currIndx) => {
            const textWord = textWords[currIndx];
            const responseValidated = this.validateWordOrParam(structWord, textWord, paramsExamples, paramsAcc);
            paramsAcc = responseValidated.paramsAcc;
            if (responseValidated.hasCoincidence) {
                coincidences++;
            }
            else if (strict) {
                throw new entity_1.StrictStructError();
            }
            return [...acc, responseValidated.hasCoincidence];
        }, []);
        return {
            confidence: this.checkConfidence(coincidences, arrayCoincidences),
            params: paramsAcc,
        };
    }
    train(entityRepository) {
        if (!entityRepository) {
            throw new Error("Not repository provided");
        }
        this.entityRepository = entityRepository;
    }
    checkConfidence(coincidences, arrayCoincidences) {
        const confidence = coincidences / arrayCoincidences.length;
        return confidence;
    }
    updateConfidence(newConfidence) {
        if (newConfidence > 1 || newConfidence < 0) {
            throw new Error("Invalid confidence range, min confidence should be between 0 and 1");
        }
        if (newConfidence < 0.4) {
            console.warn("A confidence less than 0.4 can reduce performance, if you like to get params use --- rather than recognize");
        }
        this.minConfidence = newConfidence;
    }
    getConfidence() {
        return this.minConfidence;
    }
    validateWordOrParam(structWord, textWord, paramsExamples, paramsAcc) {
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
        }
        else {
            responseValidated.hasCoincidence = (0, helpers_1.isTheSame)(textWord, structWord);
        }
        return responseValidated;
    }
    validateParam(word, paramExamples) {
        return paramExamples.includes(word) ? true : false;
    }
    getDateFromText(text) {
        return new Date();
    }
    createResponseEntity(intent) {
        //return new Entity()
    }
}
exports.RecognizeText = RecognizeText;
// const paramsWithIndex = structWords.reduce((acc, currWord, index) => {
//   if (currWord.includes('{') && currWord.includes('}')) {
//     const param = currWord.replace(/[\{\}]+/g, '')
//     return [...acc, [param, index]]
//   }
//   return acc
// }, <any>[])
// console.log(paramsWithIndex)
//# sourceMappingURL=recognizer.js.map