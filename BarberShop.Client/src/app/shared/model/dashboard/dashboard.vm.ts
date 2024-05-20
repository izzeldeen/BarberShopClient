import { EntityBase } from "../entity-base.vm";
import { FilterBase } from "../filter-base";

export class DashboardVM extends EntityBase {
    totalAmount:number;
    discountAmount:number;
    netAmount:number;
    revenueAmount:number;
    grossProfitAmount:number;
}

export class DashboardVMFilter extends FilterBase  {

}

export interface Month {
    viewValue: string;
    value: number;
}