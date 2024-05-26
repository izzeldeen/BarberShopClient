import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { UserType } from 'src/app/core/enums/user-type';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TranslateService } from '@ngx-translate/core';
import { LocatorService } from 'src/app/core/services/locator.service';

const translate : TranslateService =  LocatorService.injector.get(TranslateService)
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: translate.instant("Barber Shop")
}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRoutingModule { }
