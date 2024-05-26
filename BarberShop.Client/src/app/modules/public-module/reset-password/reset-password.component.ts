import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageManager} from '../../../core/utilities/storage-manager';
import {BaseComponent} from "../../../shared/base.component";
import {IdentityService} from "../../../shared/services/identity.service";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {LoginVm} from "../../../shared/model/user/login.vm";
import {ModuleCode} from "../../../shared/enum/module-code-enum";
import {StorageKey} from "../../../shared/enum/storage-key-enum";
import {UserClaimType} from "../../../shared/enum/user-claim-type.enum";
import {NgForm, UntypedFormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { ForgetPasswordVM } from '../../../shared/model/user/forget-password.vm';
import { HttpHeaders } from '@angular/common/http';
import { ChangePasswordVM } from 'src/app/shared/model/user/change-password.vm';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit{
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
              this.changePassword.username = localStorage.getItem('username');;
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
                      localStorage.removeItem('username');
                      this.router.navigate(['/authorization/sign-up']);

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
