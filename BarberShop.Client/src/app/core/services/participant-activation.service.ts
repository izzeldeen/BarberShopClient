import {Injectable} from '@angular/core';
import {authApiHelper} from "../../shared/api-helper/auth-api-helper";
import {ServiceBase} from "../../shared/services/base.service";
import {ApiHelperService} from "../../shared/services/api-helper.service";

@Injectable({
    providedIn: 'root'
})
export class ParticipantActivationService extends ServiceBase<any, any> {
    constructor(protected apiHelper: ApiHelperService) {
        super(apiHelper, authApiHelper.participantActivation)
    }


    getParticipantDetails(tradeLicense: string) {
        return this.apiHelper.get(this.apiUrl + '/GetParticipantDetails?tradeLicense=' + tradeLicense);
    }

    updateParticipantDetails(participant: any) {
        return this.apiHelper.post(this.apiUrl + '/ActiveParticipantDetails', participant);
    }
}
