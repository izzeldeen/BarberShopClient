import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageManager} from '../../../core/utilities/storage-manager';
import {BaseComponent} from "../../../shared/base.component";
import {IdentityService} from "../../../shared/services/identity.service";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {LoginVm, ResetPasswordVM} from "../../../shared/model/user/login.vm";
import {ModuleCode} from "../../../shared/enum/module-code-enum";
import {StorageKey} from "../../../shared/enum/storage-key-enum";
import {UserClaimType} from "../../../shared/enum/user-claim-type.enum";
import {StoreStatusEnum} from "../../../shared/enum/store-status-enum";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent extends BaseComponent implements OnInit {
    returnUrl!: string;
    layout_mode!: string;
    isShowPassword!: boolean;
    loginModel: LoginVm = new LoginVm();
    resetPassword: ResetPasswordVM = new ResetPasswordVM();
    redirectUrl = null;
    contextMenu: any;
    isLogin: boolean = true;
    userEmail: string;
    showSuccessMessage: boolean;
    showErrorMessage: boolean;
    resendEmailEnabled: boolean = true;
    counter: number = 60;
    showResetPassword:boolean;
    constructor(private route: ActivatedRoute,
                public toastr: ToastrService,
        private identityService: IdentityService,
        private offcanvasService: NgbOffcanvas,

    ) {
        super();
        this.redirectUrl = StorageManager.get(StorageKey.AdminRedirectUrl);
        StorageManager.remove(StorageKey.AdminRedirectUrl);
        /*  // redirect to home if already logged in
          if (this.authenticationService.currentUserValue) {
              this.router.navigate(['/']);
          }*/
        offcanvasService.dismiss();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    login(form: NgForm) {
        if (form.invalid) {
            return
        } else {
            var login = new LoginVm();
            login.phoneNumber = this.loginModel.phoneNumber;
            login.code = this.loginModel.code;

            this.identityService.login(login).subscribe(
                (result: any) => {
                    if(result.isSuccess){
                        this.authenticationService.setUserContext(result.data, ModuleCode.Admin);
                        this.contextMenu = StorageManager.get(StorageKey.AdminUserContext);
                        this.router.navigate(["/admin/dashboard"]);
                       
                    }else {
                        this.toaster.error(result.errorMessage);
                    }
                   
                } 
            );
        }
    }

   
    resetPasswordForm(form: NgForm){
        if(form.invalid){
            return ;
        }else {
            this.identityService.resetPassword(this.resetPassword).subscribe(response => {
                if(response.isSuccess){
                    this.router.navigate(["/admin/dashboard"]);
                }else {
                    this.toastr.error(this.translate.instant('OldPasswordIsInCorrect'))
                }
            })
        }
    }

    toggleFieldTextType() {
        this.isShowPassword = !this.isShowPassword;
    }

   


    resendEmailTimer() {
        this.counter = 60;
        var interval = setInterval(() => {
            this.counter--;
            if (this.counter <= 0) {
                this.resendEmailEnabled = true;
                clearInterval(interval);
            };
        }, 1000);
    }
}
