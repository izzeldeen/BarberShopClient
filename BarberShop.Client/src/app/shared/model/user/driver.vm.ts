import { DriverStatus } from "../../enum/driver-status-enum";
import { EntityBase } from "../entity-base.vm";
import { FilterBase } from "../filter-base";

export class Driver extends EntityBase {
    driverNumber:string;
    license:string;
    licenceExpiryDate:Date;
    licenseImageState:string;
    saudiId:string;
    saudiIdExpiryDate:Date;
    saudiIdImageState:string;
    status:string;
    name:string;
    mobileNumber:string;
    workingHourInMin:number;
    completedTrip:number;
    cancelledTrip:number;
    eligibility:string;
    availablitiy:string;
    approvedBy:string;
    dateOfBirthHijri:any;
    identityNumber:string;
    licenseUpdatedBy:string;
    saudiIdUpdatedBy:string;
    creationDate:Date;
    dateOfBirth:Date;
    hijriDateModel:any;
    profileImageState:string;
    profileImage:string;
}

export class DriverFilter extends FilterBase {
    search:string;
    gender:number;
    statusId:number;
    eligibility:string;
    driverId:number;
}

export class UpdateDriverModel {
    id:number;
    dateOfBirthHijri:Date;
    license:any;
    saudiId:any;
}