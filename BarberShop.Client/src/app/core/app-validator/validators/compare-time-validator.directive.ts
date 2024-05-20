import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';

import * as config from "../config-dates";
import * as moment from 'moment';
import {TranslateService} from "@ngx-translate/core";

@Directive({
    selector: '[compare-time-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CompareTimeValidatorDirective, multi: true }]
})

export class CompareTimeValidatorDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    @Input() compareDate: any;
    @Input() operator: string;

    validate(c: FormControl): ValidationErrors {
        if (!c.value) { return null }
        if (!this.compareDate) { return null }
        let value: number;
        let valueDate: Date;
        let value2: number;
        let value2Date: Date;
        let defualtDate = new Date();

        if (typeof c.value === "string") {
            valueDate = moment(c.value, config.datetimeFormat).toDate();
        }
        else {
            valueDate = moment(new Date(c.value), config.datetimeFormat).toDate();
        }
        if (typeof this.compareDate === "string") {
            value2Date = moment(this.compareDate, config.datetimeFormat).toDate();

            if (!value2)
                value2Date = moment(new Date(this.compareDate), config.datetimeFormat).toDate();
        }
        else {
            value2Date = moment(new Date(this.compareDate), config.datetimeFormat).toDate();
        }

        defualtDate.setHours(valueDate.getHours(), valueDate.getMinutes());
        value = defualtDate.getTime();

        defualtDate.setHours(value2Date.getHours(), value2Date.getMinutes());
        value2 = defualtDate.getTime();

        let errorMessage = null;

        if (this.operator == "<")
            errorMessage = value < value2 ? this.translationService.instant('validators.greaterTime') : null;

        if (this.operator == "<=")
            errorMessage = value <= value2 ? this.translationService.instant('validators.greaterOrEqualTime') : null;

        if (this.operator == ">")
            errorMessage = value > value2 ? this.translationService.instant('validators.lessTime') : null;

        if (this.operator == ">=")
            errorMessage = value >= value2 ? this.translationService.instant('validators.lessOrEqualTime') : null;

        if (this.operator == "==")
            errorMessage = value != value2 ? this.translationService.instant('validators.equalTime') : null;

        const message = errorMessage != null ? {
            'greater-time-validator': {
                'message': errorMessage + moment(this.compareDate).format("hh:mm a")
            }
        } : null;
        return message;
    }
}
