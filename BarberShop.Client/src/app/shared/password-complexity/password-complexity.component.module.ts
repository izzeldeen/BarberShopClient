import { NgModule } from '@angular/core';
import { PasswordComplexityComponent } from './password-complexity.component';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
    ],
    declarations: [
        PasswordComplexityComponent
    ],
    exports: [
        PasswordComplexityComponent,
        CommonModule,
    ],
})
export class PasswordComplexityModule { }
