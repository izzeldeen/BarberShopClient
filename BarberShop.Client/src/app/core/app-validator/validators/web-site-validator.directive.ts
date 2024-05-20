import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[web-site-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: WebSiteDirective, multi: true }]
})

export class WebSiteDirective implements Validator {
    constructor(public translationService: TranslateService) {
    }

    validate(c: FormControl): ValidationErrors {
        const value: string = c.value;
        var webSiteRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i;

        if (!value) { return null; }

        const message = {
            'web-site-validator': {
                'message': this.translationService.instant('validators.correctWebSite')
            }
        };
        return webSiteRegex.test(value) ? null : message;
    }
}
