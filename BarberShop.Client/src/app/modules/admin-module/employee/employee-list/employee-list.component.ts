import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from 'src/app/shared/list.component';
import { EmployeeFilterVM, EmployeeVM } from 'src/app/shared/model/employee/employee.vm';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends ListComponent<EmployeeVM, EmployeeFilterVM> implements OnInit  {
  selected: EmployeeVM = new EmployeeVM();
  @ViewChild('detailsContent', { static: false }) detailsContent: TemplateRef<any>;
  @ViewChild('deleteContent', { static: false }) deleteContent: TemplateRef<any>;

  constructor(private activeRoute: ActivatedRoute,
    private activeRouter: Router,
    private employeeService: EmployeeService,
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal,
   ) {
    super(employeeService, EmployeeFilterVM);
    }


    ngOnInit(): void {
      super.ngOnInit();
      this.tableCollection.options.isHaveAction = true;
      this.tableCollection.headers = [
        { key: 'fullName', display: 'Name' },
        { key: 'totalAmount', display: 'Total Amount' },
        { key: 'discountAmount', display: 'Discount Amount' },
        { key: 'netAmount', display: 'Net Amount' },
        { key: 'currentAmount', display: 'Current Collected Amount' }
        // { key: 'phoneNumber', display: 'Phone Number' },
        // { key: 'position', display: 'Position' }
    ];
    this.tableCollection.actions = [
      
      {
        permission: true,
        name: 'general.edit',
        iconName: 'mdi mdi-pencil',
        callBack: (row: EmployeeVM) => {
            this.assignServices(row);
        }
    },
      {
        permission: true,
        name: 'general.edit',
        iconName: 'mdi mdi-pencil',
        callBack: (row: EmployeeVM) => {
            this.manageItem(row);
        }
    },
    {
      permission: this.hasPermission('delete_driver'),
      name: 'delete',
      iconName: 'mdi mdi-trash-can-outline text-danger',
      callBack: (row: EmployeeVM) => {
          this.selected = new EmployeeVM();
          this.selected = row;
        this.onOpenDeleteModel();
      }
  },

      {
        permission: true,
        name: 'details',
        iconName: 'fas fa-angle-right text-success',
        callBack: (row: EmployeeVM) => {

            this.selected = new EmployeeVM();
            this.selected = row;
            this.offcanvasService.open(this.detailsContent, {
              backdrop: 'static',
              position: this.selectedLanguage.lang == 'ar' ? 'start' : 'end'
          });
        }
    }

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

assignServices(item:EmployeeVM){
  this.filter.id = item?.id ? item.id : 0;
  let filterParams = this.encode(JSON.stringify(this.filter));
  const urlTree = this.router.parseUrl(this.router.url);
  let urlWithoutParams: any = urlTree.root.children['primary'].segments.map(it => it.path);
  // urlWithoutParams.pop();
  urlWithoutParams.join('/');
  this.router.navigate(['admin/employee/assign-service' , item.id]);
}

}
