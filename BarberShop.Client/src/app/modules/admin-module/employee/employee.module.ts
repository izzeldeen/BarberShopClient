import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAccordion, NgbPanel, NgbPanelContent, NgbPanelTitle, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveTableModule } from 'src/app/shared/responsive-table/responsive-table.module';
import { AppValidatorModule } from 'src/app/core/app-validator/app-validator.module';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { EmployeeAssignServiceComponent } from './employee-assign-service/employee-assign-service.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceService } from 'src/app/shared/services/service.service';




@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeManageComponent,
    EmployeeDetailsComponent,
    EmployeeAssignServiceComponent
  ],
  imports: [
    CommonModule,
      EmployeeRoutingModule,
      TranslateModule,
      FormsModule,
      NgSelectModule,
      NgbTooltip,
      ResponsiveTableModule,
      AppValidatorModule,
      NgbAccordion,
      NgbPanel,
      NgbPanelTitle,
      NgbPanelContent,
      SharedModule
      
  ],
  providers:[EmployeeService,ServiceService]
})
export class EmployeeModule { }
