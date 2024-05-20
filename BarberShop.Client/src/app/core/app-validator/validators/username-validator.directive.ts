import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[username-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: UsernameDirective, multi: true }]
})
export class UsernameDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }
    @Input() maxLength: number;
    @Input() minLength: number;
    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;
      
      var usernameRegex = /^(?=[a-zA-Z][a-zA-Z0-9])[-\w.\w@]{5,50}([a-zA-Z0-9\d]|(?<![-.@_]))$/;
      
        if (!value) { return null }
        const message = {
            'username-validator': {
                'message': this.translationService.instant('validators.wrongUsernameFormat')
            }
        };

        return usernameRegex.test(value) ? null : message;
    }
}
