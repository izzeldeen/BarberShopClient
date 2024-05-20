import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';

import * as config from "../config-dates";
import * as moment from 'moment';
import {TranslateService} from "@ngx-translate/core";

@Directive({
    selector: '[compare-date-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CompareDateValidatorDirective, multi: true }]
})
export class CompareDateValidatorDirective implements Validator {
    @Input() compareDate: Date;
    @Input() operator: string;

    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        if (!c.value) {
            return null
        }

        if (!this.compareDate) {
            return null
      }



      let date: string = new Date(this.compareDate).toLocaleDateString();

      let value1: number = moment(c.value, config.datetimeFormat).toDate().valueOf();
        let value2: number = moment(this.compareDate, config.datetimeFormat).toDate().valueOf();

        if (isNaN(value2)) {
            value2 = moment(new Date(this.compareDate), config.datetimeFormat).toDate().valueOf();
      }

      if (isNaN(value1)) {
        value1 = moment(new Date(c.value), config.datetimeFormat).toDate().valueOf();
      }
 

        let errorMessage = null;

        if (this.operator == ">")
            errorMessage = value1 > value2 ? null : this.translationService.instant('validators.greaterDate');

        if (this.operator == ">=")
            errorMessage = value1 >= value2 ? null : this.translationService.instant('validators.greaterOrEqualDate');

        if (this.operator == "<")
            errorMessage = value1 < value2 ? null : this.translationService.instant('validators.lessDate');

        if (this.operator == "<=")
            errorMessage = value1 <= value2 ? null : this.translationService.instant('validators.lessOrEqualDate');

        if (this.operator == "==")
            errorMessage = value1 == value2 ? null : this.translationService.instant('validators.equalDate');

        const message = errorMessage != null ? {
            'greater-date-validator': {
            'message': errorMessage + " " + date
            }
        } : null;

        return message;
    }
}
