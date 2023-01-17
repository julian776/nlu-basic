# nlu-basic

Basic package to recognize dynamic sentences.

This library is created for a easy implementation to test a sentence and get the parameters.
You can define an intent with many examples as you need.
Is not real ML but it will be usefull in many usecases where you need a fast implementation without advanced knowledge on AI.

## How to Use

You should define a NluBasicRepository and the RecognizeText. By default nlu-basic provides a mongo repository implementation "NluBasicMongoRepository". You can define other repository if you like. To define a custom repository you have to match "NluBasicRepository" interface with api reference and it will works as expected. Feel free to make experiments.

## Quickstart
```typescript
import { Entity, NluBasicLocalRepository, RecognizeText } from "nlu-basic";

const text = "I need shirts info";
const struct = "{pronoun} {need} shirts {info}";
const params = {
    pronoun: ["I", "me"],
    need: ["need", "like"],
    info: ["info", "information", "brochure", "pdf"],
};

// Repo
const entity = new Entity("Info Shirts", [struct], params);
//console.log(!entity.intent);
const entityRepository = new NluBasicLocalRepository();
await entityRepository.addEntities([entity])

// Recognizer
const recognizer = new RecognizeText();
recognizer.train(entityRepository);
const response = await recognizer.recognize(text);

if (Array.isArray(response)) {
    response.map(entity => console.log(entity));
} else {
    console.log(response);
}
```

### Response
The response object can be an array or a unique answer with the shape
```typescript
intent: string, // Wich intent is the text associated in repo
date: Date | null, // Date if there can be identified one
intentStruct: string, // Struct that makes match with the text
params: ParamsResponse, // Params as object identified with struct
confidence: number
```

### NluBasicRepository

You should define a NluBasicRepository or use the default NluBasicMongoRepository.
To initialize the NluBasicMongoRepository you have to provide a uri connection string of mongo.

```typescript
const entityRepository = new NluBasicMongoRepository("uriTest");
```

After you initialize your repo you can add entities

The core of the library is the recognizer so you can define it as.

```typescript
const recognizer = new RecognizeText();
```

After you define the recognizer you should train it by giving a repo.
```typescript
recognizer.train(entityRepository)
```
This way to give the repo makes possible to have different repos and optimize your app. You can define each repo to check different kind of sentences. For example a repo for sales and other to support questions.

After you can try to recognize a sentences with.

```typescript
const response = await recognizer.recognize(text);
```

```typescript

const entityRepository = new NluBasicMongoRepository("uriTest");
const recognizer = new RecognizeText();
recognizer.train(entityRepository)
const response = await recognizer.recognize(text);
```

## Warning

This library is not tested with large data sets of structures. You should consider this on your use case.