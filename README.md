# nlu-basic

Basic package to recognize dynamic sentences.

Created for a easy implementation. Test a given sentence and get the parameters.
You can define an intent with many examples as you need.
Is not real ML but it will be usefull in many usecases where you need a fast implementation without advanced knowledge on AI.

# Quickstart Local Repo
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
    response.forEach(entity => console.log(entity));
} else {
    console.log(response);
}
```

# Quickstart Mongo Repo
```typescript
import { RecognizeText, NluBasicMongoRepository, Entity } from 'nlu-basic'

const text = "I need shirts info";
const struct = "{pronoun} {need} shirts {info}";
const params = {
    pronoun: ["I", "me"],
    need: ["need", "like"],
    info: ["info", "information", "brochure", "pdf"],
};

const entity = new Entity("Info Shirts", [struct], params);

// Repo
const entityRepository = new NluBasicMongoRepository('mongodb://localhost:27017')
await entityRepository.addEntities([entity])

// Recognizer
const recognizer = new RecognizeText();
recognizer.train(entityRepository);
const response = await recognizer.recognize(text);

if (Array.isArray(response)) {
    response.forEach(entity => console.log(entity));
} else {
    console.log(response);
}
```

# Response expected on quick start
```typescript
ResponseEntity {
  intent: 'Info Shirts',
  date: null,
  intentStruct: '{pronoun} {need} shirts {info}',
  params: { pronoun: 'I', need: 'need', info: 'info' },
  confidence: 1
}
```

# How to Use

You should define a NluBasicRepository and the RecognizeText. By default nlu-basic provides a mongo repository implementation "NluBasicMongoRepository". You can define other repository if you like. To define a custom repository you have to match "NluBasicRepository" interface with api reference and it will works as expected. Feel free to make experiments.

# Recognizer
The core of the library is the recognizer so you can define it as.

```typescript
const recognizer = new RecognizeText();
```

After you define the recognizer you should train it by giving a repo.
```typescript
recognizer.train(entityRepository)
```
This way to give the repo makes possible to have different repos and optimize your app. You can define each repo to check different kind of sentences. For example a repo for sales and other to support questions.


After you can try to recognize a sentence with.

```typescript
const response = await recognizer.recognize(someText);
```

When the recognizer finds a 1(100%) confidence it returns one object but when it can not finds a 100% match it will add to the response any sentence that the confidence is greater than minConfidence parameter.
# Min Confidence
Is the minium confidence that is acceptable. You can update it when creating the Recognizer or use the updateConfidence method.
```typescript
const recognizer = new RecognizeText(0.95); // 95% minConfidence

// Or by method
recognizer.updateConfidence(0.87) // 87% minConfidence
```

# Response
The response object can be an array or a unique answer with the shape.
```typescript
intent: string, // Wich intent is the text associated in repo
date: Date | null, // Date if there can be identified one (Not supported now)
intentStruct: string, // Struct that makes match with the text
params: ParamsResponse, // Params as object identified with struct
confidence: number // Between 0 and 1 
```

# NluBasicRepository

You should define a NluBasicRepository or use the default NluBasicMongoRepository.
To initialize the NluBasicMongoRepository you have to provide a uri connection string of mongo.

```typescript
const entityRepository = new NluBasicMongoRepository("uriTest");
```

# MongoRepo Config
When initialize you can pass three parameters directly on the constructor on calling the setUp method.

```typescript
const entityRepository = new NluBasicMongoRepository(uri: string, databaseName: string, collectionName: string);

// Or
entityRepository.setUp(uri: string, databaseName: string, collectionName: string)
```

If not passed the default values are
* databaseName = "nlu-basic" 
* collectionName = "entities"
