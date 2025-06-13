import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToWords'
  })
  
  export class NumberToWordsPipe implements PipeTransform {
    private oneToNineteen = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    private tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
    transform(value: number): string {
      if (value === 0) {
        return 'Zero';
      }
  
      let words = '';
  
      if (value < 0) {
        words += 'Minus ';
        value = Math.abs(value);
      }
  
      if (Math.floor(value / 10000000) > 0) {
        words += this.convertToWords(Math.floor(value / 10000000)) + ' Crore ';
        value %= 10000000;
      }
  
      if (Math.floor(value / 100000) > 0) {
        words += this.convertToWords(Math.floor(value / 100000)) + ' Lakh ';
        value %= 100000;
      }
  
      if (Math.floor(value / 1000) > 0) {
        words += this.convertToWords(Math.floor(value / 1000)) + ' Thousand ';
        value %= 1000;
      }
  
      if (Math.floor(value / 100) > 0) {
        words += this.convertToWords(Math.floor(value / 100)) + ' Hundred ';
        value %= 100;
      }
  
      if (value > 0) {
        if (words !== '') {
          words += 'and ';
        }
  
        if (value < 20) {
          words += this.oneToNineteen[value] + ' ';
        } else {
          words += this.tens[Math.floor(value / 10)] + ' ';
          words += this.oneToNineteen[value % 10] + ' ';
        }
      }
  
      return words.trim();
    }
  
    private convertToWords(num: number): string {
      return this.transform(num);
    }
  }




@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: any[]): any[] {
    if (!Array.isArray(value)) {
      return value;
    }
    return value.slice().reverse();
  }
}