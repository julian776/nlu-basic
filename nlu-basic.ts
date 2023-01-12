
export { RecognizeText } from "./src/nlu/recognizer/recognizer";

export { NluBasicMongoRepository } from "./src/repositories/mongo/nlu-mongo.repository"

export { NluBasicLocalRepository } from "./src/repositories/local/nlu-local.repository";
//module.exports.NluBasicLocalRepository = NluBasicLocalRepository

// -------------- Types -------------------
export { NluBasicRepository } from './src/types/repositories/entity-repository'

// Models
export { Entity } from './src/types/repositories/models/entity.model'
export type { ParamExamples } from './src/types/repositories/models/entity.model'
export { ResponseEntity } from './src/nlu/recognizer/models/entity'