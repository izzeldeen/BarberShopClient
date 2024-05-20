import {NgModule} from '@angular/core';

import {TranslateModule} from "@ngx-translate/core";
import {AttachmentsComponent} from "./attachments.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        AttachmentsComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
    ],
    exports: [
        AttachmentsComponent
    ],
    providers: []
})
export class AttachmentsModule {
}
