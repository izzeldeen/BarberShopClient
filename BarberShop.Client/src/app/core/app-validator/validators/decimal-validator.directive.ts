import { Directive, ElementRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
  selector: '[decimal-validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DecimalValidatorDirective, multi: true }]
})

export class DecimalValidatorDirective implements Validator {
  constructor(public translationService: TranslateService, private el: ElementRef) {
  }

  validate(c: FormControl): ValidationErrors {
    const value: string = c.value;
    var decimalRegex = /^(0|[1-9]\d*|(0|[1-9]\d*)\.\d+)$/gm;

    let current: string = this.el.nativeElement.value;

    if (!current) { return null }

    const message = {
      'decimal-validator': {
        'message': this.translationService.instant('validators.InvalidValue')
      }
    };
    return decimalRegex.test(current) ? null : message;
  }
}
