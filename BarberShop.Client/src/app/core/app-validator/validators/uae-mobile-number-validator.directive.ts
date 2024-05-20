import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[uae-mobile-number-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: UaeMoileNumberDirective, multi: true }]
})
export class UaeMoileNumberDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;
        var phoneRegex = /^(?:\+971|00971|0)(?:50|51|52|53|54|55|56|57|58|59)\d{7}$/i;
        var phoneRegex971 = /^((\+971|00971){1}(2|3|4|6|7|9|50|51|52|55|56){1}([0-9]{7}))$/;
//^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$
        if (!value) { return null }

        const message = {
            'uae-mobile-number-validator': {
                'message': this.translationService.instant('validators.uaeMobileNumbersOnlyAllowed')
            }
        };

       
        return phoneRegex.test(value) ? null : phoneRegex971.test(value) ? null : message;
        
    }
}
