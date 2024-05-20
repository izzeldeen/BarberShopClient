import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[two-digit-decimal]'
})
export class TwoDigitDecimalNumberDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return null
    }
    let current: string = this.el.nativeElement.value;
    
    current = current.replace(" ", "");
    let firstElem = current.charAt(0);

    if (current.length > 1 && firstElem == "0") {
      let seconedElem = current.charAt(1);
      if (seconedElem != "." && current.length > 3) {
        event.preventDefault();
      }
    } 
    current = current + event.key;
    if (current && !String(current).match(this.regex)) {
      event.preventDefault();
    }
  }
}
