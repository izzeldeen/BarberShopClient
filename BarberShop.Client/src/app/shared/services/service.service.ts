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


}