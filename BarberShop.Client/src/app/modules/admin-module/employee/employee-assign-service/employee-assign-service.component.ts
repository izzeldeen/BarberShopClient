import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base.component';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-employee-assign-service',
  templateUrl: './employee-assign-service.component.html',
  styleUrls: ['./employee-assign-service.component.scss']
})
export class EmployeeAssignServiceComponent  extends BaseComponent{
  entityDetails:any;
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


}
