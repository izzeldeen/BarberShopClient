import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceRoutingModule } from './service-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAccordion, NgbPanel, NgbPanelContent, NgbPanelTitle, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveTableModule } from 'src/app/shared/responsive-table/responsive-table.module';
import { AppValidatorModule } from 'src/app/core/app-validator/app-validator.module';
import { ServiceService } from 'src/app/shared/services/service.service';
import { ServiceManageComponent } from './service-manage/service-manage.component';
import { CategoryService } from 'src/app/shared/services/category.service';



@NgModule({
  declarations: [
    ServiceListComponent,
    ServiceManageComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
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
  providers:[ServiceService,CategoryService]
})
export class ServiceModule { }
