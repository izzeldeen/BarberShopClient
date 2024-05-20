import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[uae-nindidigit-number-validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: uaenindidigitnumberDirective, multi: true }]
})
export class uaenindidigitnumberDirective implements Validator {
  constructor(public translationService: TranslateService) {
  }

  validate(c: FormControl): ValidationErrors {
    const value: string = c.value;
    const phoneRegex = /^(?:50|51|52|53|54|55|56|57|58|59)\d{7}$/; // Matches any digit from 50 to 59 followed by 7 digits

    if (!value) {
      return null;
    }

    const message = {
      'uae-nindidigit-number-validator': {
        'message': this.translationService.instant('validators.uaeMobileNumbersOnlyAllowed')
      }
    };

    return phoneRegex.test(value) ? null : message;
  }
}
