import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAccordion, NgbPanel, NgbPanelContent, NgbPanelTitle, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveTableModule } from 'src/app/shared/responsive-table/responsive-table.module';
import { AppValidatorModule } from 'src/app/core/app-validator/app-validator.module';
import { TransactionManageComponent } from './transaction-manage/transaction-manage.component';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';



@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionManageComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    TranslateModule,
    FormsModule,
    NgSelectModule,
    NgbTooltip,
    ResponsiveTableModule,
    AppValidatorModule,
    NgbAccordion,
    NgbPanel,
    NgbPanelTitle,
    NgbPanelContent
  ],
  providers:[TransactionService , EmployeeService]
})
export class TransactionModule { }
