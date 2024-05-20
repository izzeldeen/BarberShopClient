import {NgModule} from '@angular/core';
import {ChangePasswordComponent} from './change-password.component';


import {TranslateModule} from "@ngx-translate/core";
import {AppValidatorModule} from "../../core/app-validator/app-validator.module";
import {PasswordComplexityModule} from "../password-complexity/password-complexity.component.module";
import {IdentityService} from "../services/identity.service";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        ChangePasswordComponent
    ],
    imports: [
        TranslateModule,
        AppValidatorModule,
        PasswordComplexityModule,
        FormsModule
    ],
    exports: [
        ChangePasswordComponent
    ],
    providers: [
        IdentityService,
    ]
})
export class ChangePasswordModule {
}
