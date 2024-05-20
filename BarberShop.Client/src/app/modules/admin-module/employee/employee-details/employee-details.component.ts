import { HttpStatusCode } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from 'src/app/shared/details.component';
import { EmployeeFilterVM, EmployeeVM } from 'src/app/shared/model/employee/employee.vm';
import { SalaryCalculationType } from 'src/app/shared/responsive-table/enums';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent extends DetailsComponent<EmployeeVM, EmployeeFilterVM> {
  @Input() id = null;
   salaryCalculationType = ['Fixed' , 'Percentage' , 'Fixed'];
  constructor(private employeeService: EmployeeService){
    super(employeeService , EmployeeVM);
  }
  
  override ngOnInit() {
    this.entityId = this.id;
    super.ngOnInit()
}
}
