import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[max-number]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxNumberValidatorDirective, multi: true }]
})
export class MaxNumberValidatorDirective implements Validator {
    @Input('max-number') maxNumber: string;

    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;

        const message = {
            'max-number': {
                'message': this.translationService.instant('validators.maxNumber') + this.maxNumber
            }
        };

        return +value > +this.maxNumber ? message : null;
    }
}
