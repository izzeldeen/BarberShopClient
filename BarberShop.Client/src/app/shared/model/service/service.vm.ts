import { EntityBase } from "../entity-base.vm";
import { FilterBase } from "../filter-base";


export class ServiceVM extends EntityBase {
    name:string;
    duration:number;
    amount:number;
    shopId:number;
    isDiscountApply:boolean;
    discountPriceType:number;
    discountValue:number;
    categoryName:string;
    categoryId:number;
    discountPriceTypeName:string;
}


export class ServiceVMFilter extends FilterBase {
    categoryId:number;
    serviceName:string;
}

export class AssginedServices {
    employeeId:number;
    ServicesIds:number[];
}