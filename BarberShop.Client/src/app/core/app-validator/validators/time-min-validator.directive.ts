import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';

/*import { DateTimeHelper } from 'src/app/core/utilities/date-time-helper';*/
import {TranslateService} from "@ngx-translate/core";

@Directive({
    selector: '[min-time]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinTimeValidatorDirective, multi: true }]
})
export class MinTimeValidatorDirective implements Validator {
    @Input('min-time') minTime: string;

    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;

        const message = {
            'min-time': {
                'message': this.translationService.instant('validators.minTime') + this.minTime
            }
        };

     /*   var min = DateTimeHelper.TimeToDate(this.minTime);

        var current = DateTimeHelper.TimeToDate(value);

        return current && current.getTime() < min.getTime() ? message : null;*/
        return  null;
    }
}
