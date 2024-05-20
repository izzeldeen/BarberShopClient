import { Injectable } from "@angular/core";
import { ServiceBase } from "./base.service";
import { ApiHelperService } from "./api-helper.service";
import { apiNames } from "../constants/api-names";
import { UserVM, UsersFilterVM } from "../model/user/user.vm";




@Injectable()
export class UserService extends ServiceBase<UserVM, UsersFilterVM> {
    constructor(protected apiHelper: ApiHelperService) {
        super(apiHelper, apiNames.user)
    }


    getAllClients(){
        return this.apiHelper.get<any>(this.apiUrl + '/clients')
    }
   
}
