import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LocatorService } from 'src/app/core/services/locator.service';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentManageComponent } from './appointment-manage/appointment-manage.component';

const translate : TranslateService =  LocatorService.injector.get(TranslateService)
const routes: Routes = [
  {
    path: '',
    component: AppointmentManageComponent,
    title: translate.instant("Appointments")
}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AppointmentRoutingModule { }
