import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[min-length-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinLengthValidatorDirective, multi: true }]
})

export class MinLengthValidatorDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    @Input() minLength: number;

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;

        const message = {
            'min-length-validator': {
                'message': this.translationService.instant('validators.minlength') + this.minLength
            }
        };
        return value && value.toString().trim().length < this.minLength ? message : null;
    }
}
