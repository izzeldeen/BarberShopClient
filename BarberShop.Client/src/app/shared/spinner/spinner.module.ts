import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from "./loading-spinner.component";
import {SpinnerService} from "./spinner.service";

@NgModule({
    declarations: [
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent
    ],
    providers: [
        SpinnerService
    ]
})
export class SpinnerModule {
}
