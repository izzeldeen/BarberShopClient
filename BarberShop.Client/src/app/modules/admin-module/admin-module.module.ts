import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {FeatherModule} from "angular-feather";
import {allIcons} from "angular-feather/icons";
import {NgbDropdownModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {AdminModuleRoutingModule} from "./admin-module-routing.module";
import { TransactionService } from 'src/app/shared/services/transaction.service';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminModuleRoutingModule,
    FeatherModule.pick(allIcons),
    RouterModule,
    NgbDropdownModule,
    NgbNavModule
    
    
  ],
  providers:[TransactionService]
})
export class AdminModuleModule { }
