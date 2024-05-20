import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[phone-number-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PhoneNumberDirective, multi: true }]
})

export class PhoneNumberDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;
        var phoneRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

        if (!value) { return null }

        const message = {
            'phone-number-validator': {
                'message': this.translationService.instant('validators.phoneNumbersOnlyAllowed')
            }
        };
        return phoneRegex.test(value) ? null : message;
    }
}
