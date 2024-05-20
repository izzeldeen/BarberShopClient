import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagetitleComponent} from './pagetitle/pagetitle.component';
import {BaseComponent} from "./base.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SpinnerModule} from "./spinner/spinner.module";
import {FormsModule} from "@angular/forms";
import {NgbModalModule, NgbModule, NgbNavModule, NgbPopoverModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

import {ApiHelperService} from "./services/api-helper.service";
import {AppValidatorModule} from "../core/app-validator/app-validator.module";
import {TimerComponent} from "./timer/timer.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { PipeChartComponent } from './charts/pipe-chart/pipe-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PickListComponent } from './pick-list/pick-list.component';
import { PickListModule } from 'primeng/picklist';


@NgModule({
    declarations: [

        TimerComponent,
        PagetitleComponent,
        PipeChartComponent,
        BarChartComponent,
        CalendarComponent,
        PickListComponent
    ],
imports: [
        CommonModule,
        SpinnerModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgbTooltipModule,
        NgbPopoverModule,
        NgbNavModule,
        AppValidatorModule,
        TranslateModule,
        NgApexchartsModule,
        NgbModalModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
          }),
          PickListModule 
   
    ],
    exports: [PagetitleComponent, TimerComponent,
        PipeChartComponent,
        BarChartComponent,
        CalendarComponent,
        PickListComponent
        ],
    providers: [
        ApiHelperService,
    ]
})
export class SharedModule {
}
