import {Directive} from '@angular/core';
import {NG_VALIDATORS, Validator, UntypedFormControl, ValidationErrors} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[password-validator]',
    providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}]
})

export class PasswordValidatorDirective implements Validator {

    constructor(public translationService: TranslateService) {

    }

    validate(c: UntypedFormControl): ValidationErrors {
        const value: string = c.value;
        var passwordRegex = /^(?=.*?[#?!@$%^&*-]).{8,}$/;

        if (!value) {
            return null;
        } else {
            const message = {
                'password-validator': {
                    'message':this.translationService.instant('validators.passwordValidator')
                }
            };
            return passwordRegex.test(value) ? null : message;
        }


    }
}
