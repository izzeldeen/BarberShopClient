import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResponsiveTableComponent} from './responsive-table.component';
import {TranslateModule} from "@ngx-translate/core";
import {NgbPopover, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {TableLoaderComponent} from "./table-loader/table-loader.component";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
    declarations: [
        ResponsiveTableComponent,
        TableLoaderComponent,
    ],
    exports: [
        ResponsiveTableComponent,
        TableLoaderComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        NgbTooltip,
        NgxPaginationModule,
        FormsModule,
        NgbPopover
    ]
})
export class ResponsiveTableModule {
}
