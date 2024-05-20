import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {CompareFieldsValidatorDirective} from './validators/compare-fields-validator.directive';
import {MaxNumberValidatorDirective} from './validators/max-number-validator.directive';
import {MinNumberValidatorDirective} from './validators/min-number-validator.directive';
import {MaxLengthValidatorDirective} from './validators/max-length-validator.directive';
import {LanguageValidatorDirective} from './validators/language-text-validator.directive';
import {EmailValidatorDirective} from './validators/email-validator.directive';
import {CompareTimeValidatorDirective} from './validators/compare-time-validator.directive';
import {CompareDateValidatorDirective} from './validators/compare-date-validator.directive';
import {MinLengthValidatorDirective} from './validators/min-length-validator.directive';
import {AppValidatorComponent} from './app-validator.component';
import {FaxNumberDirective} from './validators/fax-number-validator.directive';
import {MobileNumberDirective} from './validators/mobile-number.directive';
import {PhoneNumberDirective} from './validators/phone-number.directive';
import {SpecialcaharacterDirective} from './validators/special-caharacter-validator.directive';
import {WebSiteDirective} from './validators/web-site-validator.directive';
import {MinTimeValidatorDirective} from './validators/time-min-validator.directive';
import {MaxTimeValidatorDirective} from './validators/time-max-validator.directive';
import {UaeMoileNumberDirective} from './validators/uae-mobile-number-validator.directive';
import {UsernameDirective} from './validators/username-validator.directive';
import {WithoutSpacesDirective} from './validators/without-spaces-validator.directive';
import {DecimalValidatorDirective} from './validators/decimal-validator.directive';
import {CompareMinMaxValidatorDirective} from './validators/compare-MinMax-validator.directive';
import {TwoDigitDecimalNumberDirective} from './validators/two-digit-decimal-number.directive';
import {CompareMinMaxWithAmountValidatorDirective} from './validators/compare-MinMaxWithAmount-validator.directive';
import {UaeIdValidatorDirective} from "./validators/uae-id-number-validator.directive";
import {PasswordValidatorDirective} from "./validators/password-validator.directive";
import {EqualValidator} from "./validators/equal-validator.directive";
import { UaeMoileNumberCountryCodeDirective } from './validators/uae-mobile-number-country-code-validator.directive';

import { NoNumericValidatorDirective } from './validators/no-numeric-validator.directive';
import { IntegerNumberValidatorDirective } from './validators/integer-numbers-only-validator.directive';
import { uaecountrycodeDirective } from './validators/uae-country-code-validator.directive';
import { uaenindidigitnumberDirective } from './validators/uae-nindidigit-number-validator.directive';


const directives = [
    CompareDateValidatorDirective,
    CompareFieldsValidatorDirective,
    CompareTimeValidatorDirective,
    EmailValidatorDirective,
    FaxNumberDirective,
    LanguageValidatorDirective,
    MaxLengthValidatorDirective,
    MaxNumberValidatorDirective,
    MinLengthValidatorDirective,
    MinNumberValidatorDirective,
    MobileNumberDirective,
    PhoneNumberDirective,
    SpecialcaharacterDirective,
    WebSiteDirective,
    MinTimeValidatorDirective,
    MaxTimeValidatorDirective,
    UaeMoileNumberDirective,
    UsernameDirective,
    WithoutSpacesDirective,
    DecimalValidatorDirective,
    CompareMinMaxValidatorDirective,
    TwoDigitDecimalNumberDirective,
    CompareMinMaxWithAmountValidatorDirective,
    UaeIdValidatorDirective,
    PasswordValidatorDirective,
    EqualValidator,
    UaeMoileNumberCountryCodeDirective,
    NoNumericValidatorDirective,
    IntegerNumberValidatorDirective,
    uaecountrycodeDirective,
        uaenindidigitnumberDirective
    
]

@NgModule({
    declarations: [
        AppValidatorComponent,
        directives
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AppValidatorComponent,
        directives
 
    ]
})
export class AppValidatorModule {
}
