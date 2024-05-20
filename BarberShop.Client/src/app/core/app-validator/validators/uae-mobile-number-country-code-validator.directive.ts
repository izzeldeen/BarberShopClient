import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, UntypedFormControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[uae-mobile-number-country-code-validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UaeMoileNumberCountryCodeDirective, multi: true }]
})
export class UaeMoileNumberCountryCodeDirective implements Validator {
    constructor(public translation: TranslateService) {
    }

    validate(c: UntypedFormControl): ValidationErrors {
        const value: string = c.value;
        var phoneRegex = /^(?:\+971)(5:50|51|52|53|54|55|56|57|58|59)\d{7}$/i;
        var phoneRegex971 = /^((\+971){1}(2|3|4|6|7|9|50|51|52|55|56){1}([0-9]{7}))$/;
//^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$
        if (!value) { return null; }

        const message = {
            'uae-mobile-number-country-code-validator': {
                'message': this.translation.instant('validators.uaeMobileNumbersWithCountryCodeOnlyAllowed')
            }
        };

       
        return phoneRegex.test(value) ? null : phoneRegex971.test(value) ? null : message;
        
    }
}
