import { EntityBase } from "../entity-base.vm";
import { FilterBase } from "../filter-base";

export class AppointmentVM extends EntityBase {
    employeeName:string;
    startDate:Date;
    endDate:Date;
    appointmentStatus:number;
    id:number;
}

export class AppointmentFilterVM extends FilterBase  {

}

