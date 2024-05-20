import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[min-number]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinNumberValidatorDirective, multi: true }]
})
export class MinNumberValidatorDirective implements Validator {
    @Input('min-number') minNumber: string;

    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;

        const message = {
            'min-number': {
                'message': this.translationService.instant('validators.minNumber') + this.minNumber
            }
        };

        return value < this.minNumber ? message : null;
    }
}
