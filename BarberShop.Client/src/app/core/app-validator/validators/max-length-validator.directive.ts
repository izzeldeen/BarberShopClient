import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[max-length-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxLengthValidatorDirective, multi: true }]
})
export class MaxLengthValidatorDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    @Input() maxLength: number;

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;

        const message = {
            'max-length-validator': {
                'message': this.translationService.instant('validators.maxLength') + this.maxLength + this.translationService.instant('validators.digits')
            }
        };
        return value && value.toString().trim().length >= this.maxLength ? message : null;
    }
}
