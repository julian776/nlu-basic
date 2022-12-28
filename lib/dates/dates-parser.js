"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateParser = void 0;
class DateParser {
    constructor() { }
    getDateFromText(text) {
        return new Date();
    }
    generateMonths() { }
    getMonthsArray(format) {
        const months = (format) => Array.from(Array(12), (e, i) => new Date(25e8 * ++i).toLocaleString("en-US", { month: format }));
        return months;
    }
}
exports.DateParser = DateParser;
