import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
  selector: '[compare-minmaxwithamount-validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareMinMaxWithAmountValidatorDirective, multi: true }]
})
export class CompareMinMaxWithAmountValidatorDirective implements Validator {
  @Input() compareMinMaxWithAmount: number;
  @Output() compareMinMaxChange = new EventEmitter();
  @Input() operatorWithAmount: string;

  constructor(public translationService: TranslateService) {
  }

  validate(c: FormControl): ValidationErrors {
    if (!c.value && c.value != 0) {
      return null
    }

    if (!this.compareMinMaxWithAmount && this.compareMinMaxWithAmount != 0) {
      return null
    }


    let amount: number = this.compareMinMaxWithAmount;

    let value1: number = c.value;
    let value2: number = this.compareMinMaxWithAmount;


    let errorMessage = null;
    if (value1 != 0) {
      if (this.operatorWithAmount == '>') {
        errorMessage = value1 > value2 ? null : this.translationService.instant('validators.greaterAmount');
      }

      if (this.operatorWithAmount == '>=') {
        errorMessage = value1 >= value2 ? null : this.translationService.instant('validators.greaterOrEqualAmount');
      }

      if (this.operatorWithAmount == '<') {
        errorMessage = value1 < value2 ? null : this.translationService.instant('validators.lessAmount');
      }

      if (this.operatorWithAmount == '<=') {
        errorMessage = value1 <= value2 ? null : this.translationService.instant('validators.lessOrEqualAmount');
      }

      if (this.operatorWithAmount == '==') {
        errorMessage = value1 == value2 ? null : this.translationService.instant('validators.equalAmount');
      }
    }


    const message = errorMessage != null ? {
      'greater-amount-validator': {
        'message': errorMessage + ' ' + amount
      }
    } : null;

    return message;
  }
}
