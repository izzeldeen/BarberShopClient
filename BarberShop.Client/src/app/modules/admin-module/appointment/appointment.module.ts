import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentManageComponent } from './appointment-manage/appointment-manage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentRoutingModule } from './appointment-routing.module';
import moment from 'moment';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from 'src/app/shared/services/appointment.service';

@NgModule({
  declarations: [
    AppointmentManageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppointmentRoutingModule,
    FormsModule],
    providers:[AppointmentService,{ provide: LOCALE_ID, useValue: 'en' } ]
    
   
})
export class AppointmentModule { }
