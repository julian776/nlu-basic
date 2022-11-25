import { formatMonth } from "./models/dates.models";


export class DateParser {
  constructor() {

  }

  public getDateFromText(text: string): Date {
    return new Date();
  }

  private generateMonths() {
    
  }

  private getMonthsArray(format: formatMonth) {
    const months = (format: formatMonth)=>Array.from(Array(12),(e,i)=>new Date(25e8*++i).toLocaleString('en-US',{month:format}));
    return months
  }
}
