import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from 'src/app/shared/list.component';
import { Month } from 'src/app/shared/model/dashboard/dashboard.vm';
import { TransactionFilter, TransactionVM } from 'src/app/shared/model/transaction/transaction.vm';
import { HeaderTypes } from 'src/app/shared/responsive-table/enums';
import { TransactionService } from 'src/app/shared/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent extends ListComponent<TransactionVM, TransactionFilter> {
  selected: TransactionVM = new TransactionVM();
  @ViewChild('deleteContent', { static: false }) deleteContent: TemplateRef<any>;

  dllMonths: Month[] = [
    { viewValue: "January", value: 1 },
    { viewValue: "February", value: 2 },
    { viewValue: "March", value: 3 },
    { viewValue: "April", value: 4 },
    { viewValue: "May", value: 5 },
    { viewValue: "June", value: 6 },
    { viewValue: "July", value: 7 },
    { viewValue: "August", value: 8 },
    { viewValue: "September", value: 9 },
    { viewValue: "October", value: 10 },
    { viewValue: "November", value: 11 },
    { viewValue: "December", value: 12 }
];
dllTransactionTypes= [{viewValue: this.translate.instant('Credit') , value: 0 },
{viewValue: this.translate.instant('Depit') , value: 1 } ]


constructor(private transactionService: TransactionService,
  private modalService: NgbModal,
  private offcanvasService: NgbOffcanvas
){
  super(transactionService, TransactionFilter);
}
ngOnInit(): void {
  super.ngOnInit();
  // this.tableCollection.options.isHaveAction = false;
  this.tableCollection.headers = [
    { key: 'employeeName', display: 'Employee Name' },
    { key: 'clientName', display: 'Client Name' },
    { key: 'totalAmount', display: 'Total Amount' },
    { key: 'discountAmount', display: 'Discount Amount' },
    { key: 'netAmount', display: 'Net Amount' },
    { key: 'revenueAmount', display: 'Revenue Amount' },
    { key: 'transactionDate', display: 'Transaction Date' , type: HeaderTypes.DateTime }
 
];
this.tableCollection.options.isHaveAction = true;
this.tableCollection.actions = [
      
  {
    permission: true,
    name: 'edit',
    iconName: 'mdi mdi-pencil',
    callBack: (row: TransactionVM) => {
        this.manageItem(row);
    }
},
        {
            permission: this.hasPermission('delete_driver'),
            name: 'delete',
            iconName: 'mdi mdi-trash-can-outline text-danger',
            callBack: (row: TransactionVM) => {
                this.selected = new TransactionVM();
                this.selected = row;
              this.onOpenDeleteModel();
            }
        },

  

]

}

onOpenDeleteModel(){
  this.modalService.open(this.deleteContent , 
      {
          backdrop:false , 
          keyboard:false,
          centered:true,
          windowClass:'modal-holder'
      });
}

delete() {
  this.onDeleteItem(this.selected).then((res) => {
      if(res){
          this.modalService.dismissAll();
          this.toaster.success(this.translate.instant('general.deletedSuccessfully'))
          this.search();
      }
  })
}

}
