import { AfterViewInit, Component } from '@angular/core';
import { ManageComponent } from 'src/app/shared/manage.component';
import { EmployeeVM } from 'src/app/shared/model/employee/employee.vm';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent extends ManageComponent<EmployeeVM>  {
  dllSalaryType = [{viewValue: this.translate.instant('Fixed') , value: 1 } , 
  {viewValue: this.translate.instant('Percentage') , value: 2 },
  {viewValue: this.translate.instant('Compound') , value: 3 }]

  constructor(private employeeService: EmployeeService){
    super(employeeService, EmployeeVM);
  //  this.getByID();
  }


  onFileChange(event){
    this.entityDetails.file = event.target.files[0];
  }

  saveForm(){
    let formData = new FormData();
     formData.append('phoneNumber', this.entityDetails.phoneNumber);
     formData.append('email', this.entityDetails.email);
     formData.append('firstName', this.entityDetails.firstName);
     formData.append('lastName', this.entityDetails.lastName);
     formData.append('position', this.entityDetails.position);
     if(this.entityDetails.employmentStartDate)
     formData.append('employmentStartDate', this.entityDetails?.employmentStartDate?.toString());
     if(this.entityDetails.fixedValue)
     formData.append('salaryCalculationType', this.entityDetails?.salaryCalculationType?.toString());
     if(this.entityDetails.percentageValue)
     formData.append('fixedValue', this.entityDetails.fixedValue?.toString());
     if(this.entityDetails.percentageValue)
     formData.append('percentageValue', this.entityDetails.percentageValue?.toString());
     formData.append('file', this.entityDetails.file);

     if(!this.isEditMode){
      this.employeeService.saveEmployee(formData).subscribe(response => {
        if(response.isSuccess){
          this.toaster.success(this.translate.instant('general.savedSuccessMessage'), this.translate.instant('general.success'));
          this.backToList();
        }else {
          this.toaster.error(response.errorMessage);
        }
      })
     }else {
      formData.append('employeeId', this.entityDetails.id.toString());
      this.employeeService.updateEmployee(formData).subscribe(response => {
        if(response.isSuccess){
          this.toaster.success(this.translate.instant('general.savedSuccessMessage'), this.translate.instant('general.success'));
          this.backToList();
        }else {
          this.toaster.error(response.errorMessage);
        }
      })
     }
    
  }
  getByID() {
    this.serviceBase.getByID(this.entityDetails.id).subscribe((res) => {
      
            this.entityDetails = res.data;
            if(this.entityDetails.employmentStartDate) {
              const dateObj = new Date(this.entityDetails.employmentStartDate);
              this.entityDetails.employmentStartDate = dateObj.toISOString().split('T')[0];
            }
    })
}
  

}
