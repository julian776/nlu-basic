"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseEntity = exports.Entity = exports.NluBasicLocalRepository = exports.NluBasicMongoRepository = exports.RecognizeText = void 0;
var recognizer_1 = require("./src/nlu/recognizer/recognizer");
Object.defineProperty(exports, "RecognizeText", { enumerable: true, get: function () { return recognizer_1.RecognizeText; } });
var nlu_mongo_repository_1 = require("./src/repositories/mongo/nlu-mongo.repository");
Object.defineProperty(exports, "NluBasicMongoRepository", { enumerable: true, get: function () { return nlu_mongo_repository_1.NluBasicMongoRepository; } });
var nlu_local_repository_1 = require("./src/repositories/local/nlu-local.repository");
Object.defineProperty(exports, "NluBasicLocalRepository", { enumerable: true, get: function () { return nlu_local_repository_1.NluBasicLocalRepository; } });
// Models
var entity_model_1 = require("./src/types/repositories/models/entity.model");
Object.defineProperty(exports, "Entity", { enumerable: true, get: function () { return entity_model_1.Entity; } });
var entity_1 = require("./src/nlu/recognizer/models/entity");
Object.defineProperty(exports, "ResponseEntity", { enumerable: true, get: function () { return entity_1.ResponseEntity; } });
//# sourceMappingURL=nlu-basic.js.map