import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from 'src/app/shared/list.component';
import { ServiceVM, ServiceVMFilter } from 'src/app/shared/model/service/service.vm';
import { HeaderTypes } from 'src/app/shared/responsive-table/enums';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent  extends ListComponent<ServiceVM, ServiceVMFilter> implements OnInit {
  selected: ServiceVM = new ServiceVM();
  @ViewChild('detailsContent', { static: false }) detailsContent: TemplateRef<any>;
  @ViewChild('deleteContent', { static: false }) deleteContent: TemplateRef<any>;
  dllCategories = [];

  constructor(private activeRoute: ActivatedRoute,
    private activeRouter: Router,
    private serviceService: ServiceService,
    private offcanvasService: NgbOffcanvas,
    private categoriesService: CategoryService,
    private modalService: NgbModal,
   ) {
    super(serviceService, ServiceVMFilter);
    this.getAllCategories();
    }
    
    
    ngOnInit(): void {
      super.ngOnInit();
      this.tableCollection.options.isHaveAction = true;
      this.tableCollection.headers = [
        { key: 'categoryName', display: 'Category' },
        { key: 'name', display: 'Name' },
        { key: 'duration', display: 'Duration' },
        { key: 'amount', display: 'Amount' },
        { key: 'isDiscountApply', display: 'Apply Discount' , type: HeaderTypes.Boolean },
        { key: 'discountPriceTypeName', display: 'Discount Type' },
        { key: 'discountValue', display: 'Value' }
        
    ];
    this.tableCollection.actions = [
      
      {
        permission: true,
        name: 'edit',
        iconName: 'mdi mdi-pencil',
        callBack: (row: ServiceVM) => {
            this.manageItem(row);
        }
    },
            {
                permission: this.hasPermission('delete_driver'),
                name: 'delete',
                iconName: 'mdi mdi-trash-can-outline text-danger',
                callBack: (row: ServiceVM) => {
                    this.selected = new ServiceVM();
                    this.selected = row;
                  this.onOpenDeleteModel();
                }
            },

      {
        permission: true,
        name: 'details',
        iconName: 'fas fa-angle-right text-success',
        callBack: (row: ServiceVM) => {

            this.selected = new ServiceVM();
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

getAllCategories(){
  this.categoriesService.getAll().subscribe(response => {
    if(response.isSuccess){
      this.dllCategories = this.uiHelper.getDropdownItems(response.data  ,this.uiHelper.getNameLabel() ,this.uiHelper.getIdLabel(), false );
    }else {
      this.dllCategories = [];
    }
   })
}

}
