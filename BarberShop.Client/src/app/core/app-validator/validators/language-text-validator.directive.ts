import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";



@Directive({
  selector: '[language-validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LanguageValidatorDirective, multi: true }]
})

export class LanguageValidatorDirective implements Validator {
  constructor(private translationService: TranslateService) {
  }

  @Input() language: string;
  @Input() acceptSpecialChar: boolean = false;

  validate(c: FormControl): ValidationErrors {
    var value: string = c.value;
    var message = null;
    if (value) {
      var regex = null;
      if (this.language.toLocaleUpperCase() == 'AR') {
        
        regex =  !this.acceptSpecialChar ? /^[\u0621-\u064A0-9_.,() ]+$/ : /^[\u0621-\u064A0-9_.&-//()"', ]+$/;
        if (!regex.test(value)) {
          message = {
            'language-validator': {
              'message': this.translationService.instant('validators.onlyArabicIsAllowed')
            }
          };
        }
      } else if (this.language.toLocaleUpperCase() == 'EN') {
        regex = !this.acceptSpecialChar ?   /^[A-Za-z0-9_.', ]+$/ : /^[A-Za-z0-9_.&-//()"', ]+$/;
        if (!regex.test(value)) {
          message = {
            'language-validator': {
              'message': this.translationService.instant('validators.onlyEnglishIsAllowed')
            }
          };
        }
      }
      else if (this.language.toLocaleUpperCase() == 'FR') {
        regex = /[\u00C0-\u017Fa-zA-Z']+([- ][\u00C0-\u017Fa-zA-Z']+)*/;
        if (!regex.test(value)) {
          message = {
            'language-validator': {
              'message': this.translationService.instant('validators.onlyFrenchIsAllowed')
            }
          };
        }
      }
    }


    return message;
  }
}
