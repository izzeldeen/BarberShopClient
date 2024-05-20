// import { Directive } from '@angular/core';
// import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
// import { TranslateService } from '@ngx-translate/core';

// @Directive({
//   selector: '[uae-country-code-validator]',
//   providers: [{ provide: NG_VALIDATORS, useExisting: uaecountrycodeDirective, multi: true }]
// })
// export class uaecountrycodeDirective implements Validator {
//   constructor(public translationService: TranslateService) {
//   }

//   validate(c: FormControl): ValidationErrors {
//     const value: string = c.value.code;
//     const phoneRegex = /^\+971$/; // Matches "+971" only
//     if (!value) {
//       return null;
//     }

//     const message = {
//       'uae-country-code-validator': {
//         'message': this.translationService.instant('validators.uaeMobileNumbersOnlyAllowed')
//       }
//     };

//     return phoneRegex.test(value) ? null : message;
//   }
// }

import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[uae-country-code-validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: uaecountrycodeDirective, multi: true }]
})
export class uaecountrycodeDirective implements Validator {
  constructor(public translationService: TranslateService) {}

  validate(c: FormControl): ValidationErrors {
    const value: string = c.value?.code; // Access the code property of the value
    const phoneRegex = /^\+971$/; // Matches "+971" only
    
    // Check if the field is required
    const requiredValidation = Validators.required(c);

    // If the field is required and empty, return the required validation error
    if (requiredValidation !== null) {
      return requiredValidation;
    }

    // Perform the UAE country code validation
    if (!value) {
      return null;
    }

    const message = {
      'uae-country-code-validator': {
        'message': this.translationService.instant('validators.uaeMobileNumbersWithCountryCodeOnlyAllowed')
      }
    };

    return phoneRegex.test(value) ? null : message;
  }
}

