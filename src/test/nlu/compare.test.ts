import { RecognizeText } from "../../nlu/recognizer/recognizer"
import { EntityRepository } from "../../nlu/repositories/entity.repository"

describe('Compare func test', () => {

    let entityRepository = new EntityRepository({}, [])
    
    afterEach(() => {
        jest.resetAllMocks()
    })

    test('Should fail', () => {
        const recognizer = new RecognizeText(entityRepository)
        recognizer.recognize('as')
        expect(true).toBe(true)
    })

    test('compare', () => {
        const text = 'Oe necesito saber si venden camisas pero no se si sea cierto'
        const struct = '{greet} {need} saber si {sell} camisas'
        const params = {
            greet: [
                'Buenas',
                'Hola',
                'Holi',
                'Oe'
            ],
            need: [
                'necesito',
                'quiero',
                'tienen'
            ],
            sell: [
                'venden'
            ]
        }
        const recognizer = new RecognizeText(entityRepository)
        recognizer.compare(text, struct, params)
    })
})