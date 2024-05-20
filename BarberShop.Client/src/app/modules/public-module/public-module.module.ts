import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    NgbCarouselModule,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgbPopover,
    NgbTooltip
} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {AppValidatorModule} from "../../core/app-validator/app-validator.module";
import {ResponsiveTableModule} from "../../shared/responsive-table/responsive-table.module";
import {LayoutsModule} from "../../layouts/layouts.module";
import {LoginComponent} from "./login/login.component";
import {PublicAdminRoutingModule} from "./public-routing.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { VerifiedSuccessComponent } from './verified-success/verified-success.component';
import { VerifiedErrorComponent } from './verified-error/verified-error.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../../shared/shared.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';




@NgModule({
    declarations: [
        LoginComponent,
        VerifiedSuccessComponent,
        VerifiedErrorComponent,
        ChangePasswordComponent,
        ResetPasswordComponent
    ],
    imports: [
        CommonModule,
        PublicAdminRoutingModule,
        NgbCarouselModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        AppValidatorModule,
        NgbPopover,
        NgbTooltip,
        ResponsiveTableModule,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        LayoutsModule,
        NgSelectModule,
        SharedModule,
        CdkStepperModule,
        NgStepperModule

    ],
    providers: []
})
export class PublicModuleModule {
}
