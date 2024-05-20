import { EntityBase } from "../entity-base.vm";
import { FilterBase } from "../filter-base";

export class TransactionVM extends EntityBase{
    totalAmount:number;
    discountAmount:number;
    netAmount:number;
    collectedPrice:number;
    employeeName:string;
    clientName:string;
    startDate:Date;
    endDate:Date;
    employeeId:number;
    description:string;
    transactionType:number;
    transactionDate:Date;
    id:number;
    grossProfitAmount:number;
}

export class TransactionFilter extends FilterBase {
    employeeId?:number;
    clientId?:number;
    monthId?:number;
    fromDate?:Date;
    toDate?:Date;
    transactionType?:number;
}