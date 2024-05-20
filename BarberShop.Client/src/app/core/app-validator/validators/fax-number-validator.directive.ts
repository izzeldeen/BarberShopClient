import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[fax-number-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: FaxNumberDirective, multi: true }]
})

export class FaxNumberDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;
        var faxNumberRegex = /^\+?[0-9]{6,}$/i;

        if (!value) { return null }

        const message = {
            'fax-number-validator': {
                'message': this.translationService.instant('validators.validFaxNumber')
            }
        };
        return faxNumberRegex.test(value) ? null : message;
    }
}
