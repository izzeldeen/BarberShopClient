import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";

@Directive({
  selector: '[nonumeric-validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoNumericValidatorDirective, multi: true }]
})
export class NoNumericValidatorDirective implements Validator {
  constructor(private translationService: TranslateService) {}

  @Input() acceptSpecialChar: boolean = false;

  validate(c: FormControl): ValidationErrors {
    const value: string = c.value;
    let message: ValidationErrors | null = null;

    if (value) {
      const regex = !this.acceptSpecialChar ? /^[^\d]+$/u : /^[^\d]+$/u;
      // The regex /^[^\d]+$/u matches any string that does not contain digits.

      if (!regex.test(value)) {
        message = {
          'nonumeric-validator': {
            'message': this.translationService.instant('validators.noNumericAllowed')
          }
        };
      }
    }

    return message;
  }
}
