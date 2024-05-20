import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import {TranslateService} from "@ngx-translate/core";

@Directive({
    selector: '[compare-field]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CompareFieldsValidatorDirective, multi: true }]
})

export class CompareFieldsValidatorDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    @Input('compare-field') controlToCompare: string;

    validate(control1: AbstractControl): ValidationErrors | null {
        const value1: string = control1.value;

        const control2 = control1.root.get(this.controlToCompare);

        if (!control2)
            return null

        const value2 = control2.value;

        const subscription: Subscription = control2.valueChanges.subscribe
            (
                () => {
                    control1.updateValueAndValidity();
                    subscription.unsubscribe();
                });

        const message = {
            'comparevalidator': {
                'message': this.translationService.instant('validators.comparePasswordMustBeEqual')
            }
        };

        return value1 === value2 ? null : message;
    }
}
