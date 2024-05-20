import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[email-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})

export class EmailValidatorDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;
      var emailRegex = /^[^\W_](?:[\w.-]*[^\W_])?@(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.|(?:[\w-]+\.)+)(?:[a-zA-Z]{1,63}|[0-9]{1,63})\]?$/;
      //var emailRegex = /^[A-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Z0-9.-]+$/;

        if (!value) { return null }

        const message = {
            'email-validator': {
                'message': this.translationService.instant('validators.wrongEmailFormat')
            }
        };
        return emailRegex.test(value) ? null : message;
    }
}
