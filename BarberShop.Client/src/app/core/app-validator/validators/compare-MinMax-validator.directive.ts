import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
  selector: '[compare-minmax-validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareMinMaxValidatorDirective, multi: true }]
})
export class CompareMinMaxValidatorDirective implements Validator {
  @Input() compareMinMax: number;
  @Output() compareMinMaxChange = new EventEmitter();
  @Input() operator: string;

  constructor(public translationService: TranslateService) {
  }

  validate(c: FormControl): ValidationErrors {
    if (!c.value && c.value != 0) {
      return null
    }
    if (this.compareMinMax == 0) {
      return null
    }
    if (!this.compareMinMax && this.compareMinMax != 0) {
      return null
    }


    let amount: number = this.compareMinMax;

    let value1: number = c.value;
    let value2: number = this.compareMinMax;


    let errorMessage = null;
    if (this.operator == '>') {
      errorMessage = value1 > value2 ? null : this.translationService.instant('validators.greaterAmount');
    }

    if (this.operator == '>=') {
      errorMessage = value1 >= value2 ? null : this.translationService.instant('validators.greaterOrEqualAmount');
    }

    if (this.operator == '<') {
      errorMessage = value1 < value2 ? null : this.translationService.instant('validators.lessAmount');
    }

    if (this.operator == '<=') {
      errorMessage = value1 <= value2 ? null : this.translationService.instant('validators.lessOrEqualAmount');
    }

    if (this.operator == '==') {
      errorMessage = value1 == value2 ? null : this.translationService.instant('validators.equalAmount');
    }

    const message = errorMessage != null ? {
      'greater-amount-validator': {
        'message': errorMessage + ' ' + amount
      }
    } : null;

    return message;
  }
}
