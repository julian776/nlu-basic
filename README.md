# nlu-basic

Basic package to recognize dynamic sentences.

Created for easy implementation. Test a given sentence and get the parameters.
You can define an intent with many examples as you need.
Is not real ML but it will be useful in many use cases where you need a fast implementation without advanced knowledge of AI.

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
# NLU Basic Concepts

## Params
Params refer to a set of words that can be interchanged with each other. For example, "dad" and "father" can both represent the same concept in a given context. Params allow you to handle variations and synonyms in your intent recognition.

## Structs
Structs are customizable sentence patterns that help capture different variations of sentences. They consist of a combination of params and words. For example, a struct could be "create a {post}" where the param "post" can be defined as `const post = ["post", "blog", "new"]`. Structs enable flexible intent matching by accommodating different sentence structures.

## How to Use
To use NLU Basic, you need to define an instance of the `NluBasicRepository` and the `RecognizeText` classes. By default, NLU Basic provides a MongoDB repository implementation called `NluBasicMongoRepository`. However, you can define your own custom repository by implementing the `NluBasicRepository` interface. Feel free to experiment and create repositories tailored to your specific needs.

## Recognizer
The core component of NLU Basic is the recognizer, which is an instance of the `RecognizeText` class. You can create a recognizer as follows:
```typescript
const recognizer = new RecognizeText();
```

After creating the recognizer, you need to train it by providing a repository:
```typescript
recognizer.train(entityRepository);
```
Training the recognizer allows it to learn from the entities defined in the repository and improve its recognition capabilities.

To recognize a sentence, use the `recognize` method:
```typescript
const response = await recognizer.recognize(someText);
```
The `recognize` method takes a text input and returns the recognized intent(s) and associated information.

If the recognizer finds a 100% confidence match, it returns a single response object. However, if a 100% match is not found, it adds any sentence with a confidence greater than the `minConfidence` parameter to the response.

## Min Confidence
The minimum confidence (`minConfidence`) represents the acceptable confidence level for recognizing intents. You can set the `minConfidence` when creating the recognizer or use the `updateConfidence` method to modify it later. For example:
```typescript
const recognizer = new RecognizeText(0.95); // 95% minConfidence

// Or using the method
recognizer.updateConfidence(0.87); // 87% minConfidence
```

## Response
The response object returned by the recognizer can be either an array of responses or a single response object. It has the following properties:
- `intent`: The recognized intent associated with the text in the repository.
- `date`: Date information if identified (not supported at the moment).
- `intentStruct`: The struct that matched the input text.
- `params`: The identified params as an object based on the struct.
- `confidence`: The confidence score for the recognition, ranging from 0 to 1.

## NluBasicRepository
To use NLU Basic, you need to define a repository. The default repository provided is `NluBasicMongoRepository`, which is designed for MongoDB. To initialize the `NluBasicMongoRepository`, provide a MongoDB URI connection string:
```typescript
const entityRepository = new NluBasicMongoRepository("uriTest");
```

## MongoRepo Config
When initializing the `NluBasicMongoRepository`, you can pass three optional parameters directly to the constructor or use the `setUp` method:
```typescript
const entityRepository = new NluBasicMongoRepository(uri: string, databaseName: string, collectionName: string);

// Or use the method
entityRepository.setUp(uri

: string, databaseName: string, collectionName: string);
```
If you don't provide these parameters, the default values are as follows:
- `databaseName`: "nlu-basic"
- `collectionName`: "entities"

These parameters allow you to customize the MongoDB database and collection used by the repository.
