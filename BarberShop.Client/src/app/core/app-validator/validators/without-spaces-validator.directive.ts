import {Directive} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl, ValidationErrors} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";

@Directive({
    selector: '[Without-spaces-validator]',
    providers: [{provide: NG_VALIDATORS, useExisting: WithoutSpacesDirective, multi: true}]
})
export class WithoutSpacesDirective implements Validator {

    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;
        var WithoutSpaecesRegex = /^[A-Za-z_][A-Za-z0-9_]*$/g;  //new RegExp('[A-Za-z_][A-Za-z0-9_]*');

        if (!value) {
            return null;
        }

        const message = {
            'Without-spaces-validator': {
                'message': this.translationService.instant('validators.WITHOUT_SPACES')
            }
        };
        return WithoutSpaecesRegex.test(value) ? null : message;
    }
}
