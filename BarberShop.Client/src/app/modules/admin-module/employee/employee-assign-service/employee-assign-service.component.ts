import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base.component';
import { AssginedServices } from 'src/app/shared/model/service/service.vm';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-employee-assign-service',
  templateUrl: './employee-assign-service.component.html',
  styleUrls: ['./employee-assign-service.component.scss']
})
export class EmployeeAssignServiceComponent  extends BaseComponent{
  entityDetails:any;
  @ViewChild('assginedServices') assginServices:any;
id:number;
assignedServices:[];
services:[];
  constructor(
              private employeeService:EmployeeService,
              private serviceServices:ServiceService,
              private route: ActivatedRoute
  ){
super();
 this.route.params.subscribe(params => {
          this.id = +params['id'];
          this.getAllServices();
          this.getByID();
  });

  }
  getByID() {
    this.employeeService.getByID(this.id).subscribe((res) => {
            this.entityDetails = res.data;
            this.assignedServices = res.data.assignedServices;
    })
}

getAllServices(){
  this.serviceServices.getAll().subscribe(response => {
    this.services = response.data.collection;
  })
}


backToList() {
   this.router.navigate(['admin/employee'])
}

save(){
  let model = new AssginedServices();
  model.employeeId = this.id;
  model.ServicesIds = this.assginServices.targetServices.map(f => f.id);
    this.serviceServices.assginEmployeeServices(model).subscribe(response => {
      if(response.isSuccess){
        this.toaster.success(this.translate.instant('general.savedSuccessMessage'), this.translate.instant('general.success'));

      }else {
        this.toaster.error(response.errorMessage);
      }
    })
}
}
