"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dates_parser_1 = require("../../dates/dates-parser");
describe("Test DateParser", () => {
    test("Should print month Jan", () => {
        const dateParser = new dates_parser_1.DateParser();
        console.log(dateParser.getDateFromText("Text test"));
    });
});
//# sourceMappingURL=dates.test.js.map