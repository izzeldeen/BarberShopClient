import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service';
import { ApiHelperService } from "./api-helper.service";
import { apiNames } from "../constants/api-names";
import { DashboardVM, DashboardVMFilter } from '../model/dashboard/dashboard.vm';
import { TransactionFilter } from '../model/transaction/transaction.vm';



@Injectable({ providedIn: "root" })
export class DashboardService extends ServiceBase<DashboardVM, DashboardVMFilter> {
    constructor(protected apiHelper: ApiHelperService) {
        super(apiHelper, apiNames.dashboard)
    }

    getPipeCharts(filter: TransactionFilter){
        const url = this.apiUrl + '/charts' + this.filterToQuery(filter);
        return this.apiHelper.get<any>(url);
       }
       getBarCharts(filter: TransactionFilter){
        const url = this.apiUrl + '/barchart' + this.filterToQuery(filter);
        return this.apiHelper.get<any>(url);
       }


}
