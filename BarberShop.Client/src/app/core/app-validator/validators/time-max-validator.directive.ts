import {Directive, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl, ValidationErrors} from '@angular/forms';


import {TranslateService} from "@ngx-translate/core";

@Directive({
    selector: '[max-time]',
    providers: [{provide: NG_VALIDATORS, useExisting: MaxTimeValidatorDirective, multi: true}]
})
export class MaxTimeValidatorDirective implements Validator {
    @Input('max-time') maxTime: string;

    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;

        const message = {
            'max-time': {
                'message': this.translationService.instant('validators.maxTime') + this.maxTime
            }
        };

        /* var max = DateTimeHelper.TimeToDate(this.maxTime);

         var current = DateTimeHelper.TimeToDate(value);*/

        /*   return current && current.getTime() > max.getTime() ? message : null;*/
        return null;
    }
}
