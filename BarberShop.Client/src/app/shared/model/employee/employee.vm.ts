import { EntityBase } from "../entity-base.vm";
import { FilterBase } from "../filter-base";

export class EmployeeVM  extends EntityBase{
id:number;
phoneNumber:string;
email:string;
fullName:string;
firstName:string;
lastName:string;
position:string;
employmentStartDate:any;
employmentEndDate:Date;
percentageValue:number;
fixedValue:number;
salaryCalculationType:number;
file:any;
AssignedServices:any;
}

export class EmployeeFilterVM  extends FilterBase{
 fromDate:Date;
 toDate:Date;
}
