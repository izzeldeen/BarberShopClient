import { Injectable } from "@angular/core";
import { ServiceBase } from "./base.service";
import { ApiHelperService } from "./api-helper.service";
import { apiNames } from "../constants/api-names";
import { ServiceVM, ServiceVMFilter } from "../model/service/service.vm";


@Injectable()
export class ServiceService extends ServiceBase<ServiceVM, ServiceVMFilter> {

    constructor(protected apiHelper: ApiHelperService) {
        super(apiHelper, apiNames.service)
    }

    assginEmployeeServices(entity:any){
        let url = this.apiUrl + '/AssignServices';
        var getValue = (value) => {
            let val = value;
            if (typeof value == 'string') {
                val = val.trim();
            }
            return val;
        };
        Object.keys(entity).map(key => entity[key] = getValue(entity[key]));
        return this.apiHelper.post<any, any>(url ,  entity);
    }

}