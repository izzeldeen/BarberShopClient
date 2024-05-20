import {Directive} from '@angular/core';
import {NG_VALIDATORS, Validator, UntypedFormControl, ValidationErrors} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[integer-numbers-only-validator]',
    providers: [{provide: NG_VALIDATORS, useExisting: IntegerNumberValidatorDirective, multi: true}]
})

export class IntegerNumberValidatorDirective implements Validator {

    constructor(public translationService: TranslateService) {

    }

    validate(c: UntypedFormControl): ValidationErrors {
        const value: string = c.value;
        var numbersRegex = /^\-?[0-9]*$/;


        if (!value) {
            return null;
        } else {
            const message = {
                'integer-numbers-only-validator': {
                    'message':this.translationService.instant('validators.integerNumbersOnly')
                }
            };
            return numbersRegex.test(value) ? null : message;
        }


    }
}
