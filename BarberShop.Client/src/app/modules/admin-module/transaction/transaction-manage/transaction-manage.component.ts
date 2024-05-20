import { Component } from '@angular/core';
import { ManageComponent } from 'src/app/shared/manage.component';
import { TransactionVM } from 'src/app/shared/model/transaction/transaction.vm';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-transaction-manage',
  templateUrl: './transaction-manage.component.html',
  styleUrls: ['./transaction-manage.component.scss']
})
export class TransactionManageComponent extends ManageComponent<TransactionVM>  {
  dllEmployees = [];
  dllTransactionTypes= [{viewValue: this.translate.instant('Credit') , value: 0 },
  {viewValue: this.translate.instant('Depit') , value: 1 } ]
  constructor(private transactionService: TransactionService,
    private employeeService: EmployeeService,
  ){
    super(transactionService, TransactionVM);
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.employeeService.getAll().subscribe(response => {
      if(response.isSuccess){
        this.dllEmployees = this.uiHelper.getDropdownItems(response.data.collection,this.uiHelper.getFullNameLabel() ,this.uiHelper.getIdLabel(), false );
      }else {
        this.dllEmployees = [];
      }
     })
  }

}
