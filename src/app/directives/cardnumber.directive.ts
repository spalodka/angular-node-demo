import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardNumber]'
})
export class CardnumberDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
    
 // @HostListener("blur", ["$event"]) onBlur(event)
 @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    value = value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedValue = this.formatCardNumber(value);
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
  }

  private formatCardNumber(value: string): string {
    value = value.replace(/\s/g, ''); // Remove existing spaces
    let formattedValue = '';
    console.log('value is :: ',value);
    for (let i = 0; i < value.length; i++) {
      formattedValue += value[i];
      if ((i + 1) % 4 === 0 && i < value.length - 1) {
        formattedValue += ' ';
      }
    }
    return formattedValue;
  }
}

