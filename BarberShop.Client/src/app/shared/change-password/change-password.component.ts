import {Component, OnChanges, SimpleChanges, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import {ChangePasswordVM} from 'src/app/shared/model/user/change-password.vm';
import {BaseComponent} from '../base.component';
import {NgForm, UntypedFormBuilder, FormGroup, Validators} from "@angular/forms";
import {IdentityService} from "../services/identity.service";


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent extends BaseComponent implements OnChanges {
    changePassword: ChangePasswordVM;
    validMaxLength: boolean;
    validMinLength: boolean;
    hide = true;
    hideConfPas = true;
    hideNewPas = true;
    @Input() userName: string;
    @ViewChild('changePasswordForm', {static: true}) changePasswordForm;

    @Output('password-changed') passwordChanged: EventEmitter<ChangePasswordVM> = new EventEmitter<ChangePasswordVM>();

    constructor(private identityService: IdentityService, private formBuilder: UntypedFormBuilder) {
        super();

        this.changePassword = new ChangePasswordVM();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.changePassword = new ChangePasswordVM();
    }

    onChangePasswordClick(form: NgForm) {
        if (form.valid) {
            if (!this.changePassword.username) {
                this.changePassword.username = this.userName;
            }
            if (this.changePassword.oldPassword != this.changePassword.password) {
                this.identityService.changePassword(this.changePassword).subscribe(
                    (result) => {
                        const userContext = this.authenticationService.getUserContext();
                        if (userContext) {
                            userContext.token = result;
                            this.authenticationService.setUserContext(userContext);
                        }
                        this.toaster.success(this.translate.instant('user.changePasswordSucceed'), this.translate.instant('user.changePassword'))
                        this.passwordChanged.emit(this.changePassword);

                        this.changePassword = new ChangePasswordVM();
                        this.changePasswordForm.resetForm();
                    },
                    (error) => {
                        this.toaster.error(error.error[0].message, this.translate.instant('user.changePassword'))
                    }
                );
            } else {
                this.toaster.error(this.translate.instant('user.oldPasswordAndPasswordSame'), this.translate.instant('general.error'))
            }

        } else {
            for (var key in form.controls) {
                form.controls[key].updateValueAndValidity();
            }
        }
    }
}
