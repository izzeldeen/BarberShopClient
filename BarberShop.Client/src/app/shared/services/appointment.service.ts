import { Injectable } from "@angular/core";
import { ServiceBase } from "./base.service";
import { ApiHelperService } from "./api-helper.service";
import { apiNames } from "../constants/api-names";
import { AppointmentFilterVM, AppointmentVM } from "../model/appointment/appointment.vm";




@Injectable()
export class AppointmentService extends ServiceBase<AppointmentVM, AppointmentFilterVM> {
    constructor(protected apiHelper: ApiHelperService) {
        super(apiHelper, apiNames.appointment)
    }

  getAllAppointments(){
    return this.apiHelper.get<any>(this.apiUrl);
  }
}
