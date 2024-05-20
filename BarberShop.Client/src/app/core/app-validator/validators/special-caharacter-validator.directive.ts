import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[special-caharacter-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: SpecialcaharacterDirective, multi: true }]
})

export class SpecialcaharacterDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;
      var specialcaharacterDirectiveRegex = /^[A-Za-z0-9_.,() ]|[\u0621-\u064A0-9_.,() ]+$/;

        if (!value) { return null }

        const message = {
            'special-caharacter-validator': {
                'message': this.translationService.instant('validators.specialCharsValidation')
            }
        };
        return !specialcaharacterDirectiveRegex.test(value) ? message : null;
    }
}
