import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ServiceBase } from './base.service';
import {  UserVM, UsersFilterVM } from 'src/app/shared/model/user/user.vm';
import { ApiHelperService } from "./api-helper.service";
import { SecurityAccountVM } from "../model/user/security-account.vm";
import { UserContext } from "../../core/utilities/auth-handlers/user-context";
import { LoginVm, ResetPasswordVM, TokenDto } from "../model/user/login.vm";
import { ChangePasswordVM } from "../model/user/change-password.vm";
import { ForgetPasswordVM } from "../model/user/forget-password.vm";
import { RegisterVM } from "../model/user/register.vm";
import { apiNames } from "../constants/api-names";



@Injectable({ providedIn: "root" })
export class IdentityService extends ServiceBase<UserVM, UsersFilterVM> {
    constructor(protected apiHelper: ApiHelperService) {
        super(apiHelper, apiNames.identity)
    }

    profile() {

        return this.apiHelper.get<UserVM>(this.apiUrl + "/profile");
    }

    securityAccounts() {
        return this.apiHelper.get<SecurityAccountVM[]>(this.apiUrl + "/security-accounts");
    }

    getBySecurityUsername(username, accountCode?: string, headers?: HttpHeaders) {
        return this.apiHelper.get<UserVM>(this.apiUrl + "/security/username/" + username + `?accountCode=${accountCode}`, null, headers);
    }

    logout() {
        return this.apiHelper.post(this.apiUrl + '/logout', undefined);
    }

  


    login(loginModel: LoginVm) {
        const body = "phoneNumber=" + loginModel.phoneNumber.trim() + "&Password=" + loginModel.code;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set("Accept-Language", this.apiHelper.getCurrentLanguage());
        return this.apiHelper.post<any, UserContext>(this.apiUrl + '/login/admin', body, { headers: headers });
    }

    
    resetPassword(resetPasswordVM: ResetPasswordVM) {
        const body = "oldPassword=" + resetPasswordVM.oldPassword + "&newPassword=" + resetPasswordVM.newPassword;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set("Accept-Language", this.apiHelper.getCurrentLanguage());

        return this.apiHelper.post<any, any>(this.apiUrl + '/reset-password', body, { headers: headers });
    }

    sendResetPassword(username: string): any {
        return this.apiHelper.post(this.apiUrl + "/send-reset-password?username=" + username, username);
    }

    verifyResetPassword(passToken: string, headers?): any {
        return this.apiHelper.get(this.apiUrl + `/verify-reset-password?passToken=${passToken}`, null, headers);
    }

   

    changePassword(changePassword: ChangePasswordVM, headers?): any {
        return this.apiHelper.post<ChangePasswordVM, string>(this.apiUrl + "/change-password", changePassword, null, headers);
    }

    forgetPassword(forgetPasswordVM: ForgetPasswordVM, headers?): any {
        return this.apiHelper.post(this.apiUrl + "/forget-password", forgetPasswordVM, null, headers);
    }

    register(registerVM: RegisterVM, headers?): any {
        return this.apiHelper.post(this.apiUrl + "/register", registerVM, null, headers);
    }

    registerWithAttachment(entity: RegisterVM, attachment: any, attachmentAttributes: any) {
        return this.apiHelper.postWithAttachments(this.apiUrl + "/register-with-attachment", entity, attachment, attachmentAttributes);
    }

    activateUser(userId: any, headers?): any {
        return this.apiHelper.post(this.apiUrl + "/activate-user?i=" + userId, null, headers);
    }

}
