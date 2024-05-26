import { AfterViewInit, Component } from '@angular/core';
import { ManageComponent } from 'src/app/shared/manage.component';
import { TransactionVM } from 'src/app/shared/model/transaction/transaction.vm';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transaction-manage',
  templateUrl: './transaction-manage.component.html',
  styleUrls: ['./transaction-manage.component.scss']
})
export class TransactionManageComponent extends ManageComponent<TransactionVM>    {
  dllEmployees = [];
  fileUrl = environment.filesUrl;
  dllTransactionTypes= [{viewValue: this.translate.instant('Credit') , value: 0 },
  {viewValue: this.translate.instant('Depit') , value: 1 } ]
  dllTransactionSubTypes= [{viewValue: this.translate.instant('Inventory Purchases') , value: 1 , parent:1 }
  ,{viewValue: this.translate.instant('Salaries and Wages') , value: 2 , parent:1 }
  ,{viewValue: this.translate.instant('Rent or Lease Payments') , value: 3 , parent:1 } 
,{viewValue: this.translate.instant('Utilities') , value: 4 , parent:1 }
,{viewValue: this.translate.instant('Insurance') , value: 5 , parent:1 }
,{viewValue: this.translate.instant('Maintenance and Repairs') , value: 6 , parent:1 }
,{viewValue: this.translate.instant('Taxes') , value: 7  , parent:1 }
,{viewValue: this.translate.instant('Security') , value: 8, parent:1  }
,{viewValue: this.translate.instant('Software and Technology') , value: 9 , parent:1 }
,{viewValue: this.translate.instant('Miscellaneous Expenses') , value: 10, parent:1  }
,{viewValue: this.translate.instant('Cash Withdrawals') , value: 10, parent:1  }
,{viewValue: this.translate.instant('Cash Deposits') , value: 10, parent:1  }
,{viewValue: this.translate.instant('Refunds & Returns') , value: 10, parent:1  }
,{viewValue: this.translate.instant('Service Charges') , value: 10, parent:0  }
,{viewValue: this.translate.instant('Purchases') , value: 10, parent:0  }
]
dllTransactionSubSelectTypes:any[];
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

  saveForm(){
    let formData = new FormData();
    formData.append('transactionType', this.entityDetails.transactionType.toString());
    formData.append('netAmount', this.entityDetails.netAmount.toString());
    formData.append('description', this.entityDetails.description);
    if(this.entityDetails.employeeId)
    formData.append('employeeId', this.entityDetails.employeeId.toString());
  if(this.entityDetails.transactionDate)
    formData.append('transactionDate', this.entityDetails.transactionDate.toString());
    formData.append('file', this.entityDetails.file);
    if(this.entityDetails.transactionSubType)
    formData.append('transactionSubType', this.entityDetails.transactionSubType.toString());
    if(!this.isEditMode){
      this.transactionService.saveTransaction(formData).subscribe(response => {
        if(response.isSuccess){
          this.toaster.success(this.translate.instant('general.savedSuccessMessage'), this.translate.instant('general.success'));
          this.backToList();
        }else {
          this.toaster.error(response.errorMessage);
        }
      })
     }else {
      formData.append('id', this.entityDetails.id.toString());
      this.transactionService.updateTransaction(formData).subscribe(response => {
        if(response.isSuccess){
          this.toaster.success(this.translate.instant('general.savedSuccessMessage'), this.translate.instant('general.success'));
          this.backToList();
        }else {
          this.toaster.error(response.errorMessage);
        }
      })
     }
  }
  onFileChange(event){
    this.entityDetails.file = event.target.files[0];
  }
openImage(imageName:string){
  let url = this.fileUrl + imageName;
  window.open(url, '_blank');
}

getByID() {
  this.serviceBase.getByID(this.entityDetails.id).subscribe((res) => {
      if (!res.data) {
          this.entityDetails = res;
          
      } else {
          this.entityDetails = res.data;
          if(this.entityDetails.transactionDate){
            this.entityDetails.transactionDate = this.entityDetails.transactionDate.toString().split('T')[0];
           }
      }
      this.onLoadEntity(this.entityDetails);
  })
}
    onSelectTransactionFlow(){
        this.dllTransactionSubSelectTypes = this.dllTransactionSubTypes.filter(x=> x.parent == this.entityDetails.transactionType);
    }
}
