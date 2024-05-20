import {Directive} from '@angular/core';
import {NG_VALIDATORS, Validator, UntypedFormControl, ValidationErrors} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[uae-id-number-validator]',
    providers: [{provide: NG_VALIDATORS, useExisting: UaeIdValidatorDirective, multi: true}]
})

export class UaeIdValidatorDirective implements Validator {

    constructor(public translationService: TranslateService) {

    }

    validate(c: UntypedFormControl): ValidationErrors {
        const value: string = c.value;
        var uaeIdRegex = /^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$/i;

        if (!value) {
            return null;
        } else {
            const message = {
                'uae-id-number-validator': {
                    'message': this.translationService.instant('validators.wrongIdFormat')
                }
            };
            return uaeIdRegex.test(value) ? null : message;
        }

    }
}
