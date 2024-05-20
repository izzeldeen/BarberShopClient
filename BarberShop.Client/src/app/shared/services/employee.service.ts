import { Injectable } from "@angular/core";
import { ServiceBase } from "./base.service";
import { EmployeeFilterVM, EmployeeVM } from "../model/employee/employee.vm";
import { ApiHelperService } from "./api-helper.service";
import { apiNames } from "../constants/api-names";




@Injectable()
export class EmployeeService extends ServiceBase<EmployeeVM, EmployeeFilterVM> {
    constructor(protected apiHelper: ApiHelperService) {
        super(apiHelper, apiNames.employee)
    }

   saveEmployee(formData: any){
   return this.apiHelper.http.post<any>(this.apiUrl ,formData )
   }

    updateEmployee(formData: any){
    return this.apiHelper.http.put<any>(this.apiUrl ,formData )
    }
}
