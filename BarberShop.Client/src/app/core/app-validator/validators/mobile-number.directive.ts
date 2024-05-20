import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[mobile-number-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MobileNumberDirective, multi: true }]
})
export class MobileNumberDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;
        var mobileRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

        if (!value) { return null }

        const message = {
            'mobile-number-validator': {
                'message': this.translationService.instant('validators.mobileNumbersOnlyAllowed')
            }
        };

        return mobileRegex.test(value) ? null : message;
    }
}
