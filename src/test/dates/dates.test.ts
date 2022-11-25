import { DateParser } from "../../dates/dates-parser"

describe('Test DateParser', () => {

    test('Should print month Jan', ()=> {
        const dateParser = new DateParser()
        console.log(dateParser.getDateFromText('Text test'))
    })
})