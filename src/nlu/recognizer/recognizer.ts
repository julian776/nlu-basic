import { Recognizer } from "../../types/nlu/recognizer/recognizer";
import { Repository } from "../../types/nlu/repositories/entity-repository";
import { Entity, Params } from "../repositories/models/entity.model";
import { isTheSame } from "./helpers/helpers";

export class RecognizeText implements Recognizer {
  
  constructor(private entityRepository: Repository) {}

  recognize(text: string, strict=false): Entity {
    const intentsStructure = this.entityRepository.getIntentsStructure()

    intentsStructure.forEach(entity => {
      const intentStruct = entity.intentStruct
      this.compare(text, intentStruct, entity.params, strict)
    })
    return new Entity('df', 'fghfdfgdf', new Date(), {dfg: ['fgfg'], fgb:['sfddf']})
  }

  public compare(text: string, intentStruct: string, params: Params, strict=false) {
    const textWords = text.split(' ')
    const structWords = intentStruct.split(' ')   // intentStruct.replace(/{[a-zA-Z]}/, '')

    // if (textWords.length !== structWords.length) {
    //   throw new Error('Struct and text not have the same length of words')
    // }

    let coincidences = 0
    const arrayCoincidences = structWords.reduce((acc: boolean[], structWord, currIndx) => {
      const textWord = textWords[currIndx]
      let wordHasCoincidence = false
      if (structWord.includes('{') && structWord.includes('}')) {
        const param = structWord.replace(/[\{\}]+/g, '')
        console.log(params)
        console.log(param)
        wordHasCoincidence = this.validateParam(textWord, params[param])
      } else {
        wordHasCoincidence = isTheSame(textWord ,structWords[currIndx])
      }
      if (wordHasCoincidence) {
        coincidences++
      }
      
      return [...acc, wordHasCoincidence]
    }, [])
    console.log(coincidences)
    console.log(arrayCoincidences)
    return 'ACA'
  }

  private validateParam(word: string, paramExamples: Array<string>): boolean {
    return paramExamples.includes(word) ? true : false
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