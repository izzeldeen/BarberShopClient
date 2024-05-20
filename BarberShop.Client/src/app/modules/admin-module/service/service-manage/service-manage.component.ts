import { Component } from '@angular/core';
import { ManageComponent } from 'src/app/shared/manage.component';
import { ServiceVM } from 'src/app/shared/model/service/service.vm';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-service-manage',
  templateUrl: './service-manage.component.html',
  styleUrls: ['./service-manage.component.scss']
})
export class ServiceManageComponent extends ManageComponent<ServiceVM>  {
  dllDiscountType = [{viewValue: this.translate.instant('Percentage') , value: 0 },
  {viewValue: this.translate.instant('Fixed') , value: 1 } ]
  dllCategories = [];
  constructor(private serviceService: ServiceService,
    private categoriesService: CategoryService,
  ){
    super(serviceService, ServiceVM);
    this.getAllCategories();
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
