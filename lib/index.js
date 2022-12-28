"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NluBasicMongoRepository = exports.RecognizeText = void 0;
var recognizer_1 = require("./nlu/recognizer/recognizer");
Object.defineProperty(exports, "RecognizeText", { enumerable: true, get: function () { return recognizer_1.RecognizeText; } });
var nlu_mongo_repository_1 = require("./repositories/mongo/nlu-mongo.repository");
Object.defineProperty(exports, "NluBasicMongoRepository", { enumerable: true, get: function () { return nlu_mongo_repository_1.NluBasicMongoRepository; } });
