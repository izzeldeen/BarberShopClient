import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageManager} from '../../../core/utilities/storage-manager';
import {BaseComponent} from "../../../shared/base.component";
import {IdentityService} from "../../../shared/services/identity.service";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {LoginVm} from "../../../shared/model/user/login.vm";
import {ModuleCode} from "../../../shared/enum/module-code-enum";
import {StorageKey} from "../../../shared/enum/storage-key-enum";
import {UserClaimType} from "../../../shared/enum/user-claim-type.enum";
import {StoreStatusEnum} from "../../../shared/enum/store-status-enum";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { ForgetPasswordVM } from '../../../shared/model/user/forget-password.vm';
import { HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})

 
export class ChangePasswordComponent extends BaseComponent implements OnInit {
    forgetPasswordVM: ForgetPasswordVM;
    show: boolean;
    isShowPassword!: boolean;

    constructor(private route: ActivatedRoute,
                public toastr: ToastrService,
                private identityService: IdentityService,
    ) {
        super();

        this.forgetPasswordVM = new ForgetPasswordVM();
        this.show = true;

        this.route.queryParams.subscribe(params => {
            this.forgetPasswordVM.email = params['e'];
        });
    }

    ngOnInit(): void {
        super.ngOnInit();
     }


    changePassword() {
        if (this.forgetPasswordVM.password && this.forgetPasswordVM.password !== '') {
            var headers = new HttpHeaders().set('skip-authorization', 'true')
                .set("Accept-Language", this.getCurrentLanguage());

            this.identityService.forgetPassword(this.forgetPasswordVM, headers).subscribe(
                (result) => {
                    this.toaster.success(this.translate.instant('general.savedSuccessMessage'), this.translate.instant('general.add'));

                    this.router.navigate(['../authorization/sign-in'],
                        { relativeTo: this.activatedRoute });
                },
                (error) => {
                    this.error = error;
                }
            );
        }
    }

    toggleFieldTextType() {
        this.isShowPassword = !this.isShowPassword;
    }

    onChangePasswordClick(form: NgForm) {
        if (form.valid) { 
            this.changePassword(); 

        } else {
            for (var key in form.controls) {
                form.controls[key].updateValueAndValidity();
            }
        }
    }

 }
