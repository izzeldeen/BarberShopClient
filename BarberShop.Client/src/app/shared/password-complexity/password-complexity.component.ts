import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-password-complexity',
    templateUrl: './password-complexity.component.html',
})
export class PasswordComplexityComponent implements OnChanges {
    passwordMinLength: number = 5;
    passwordMaxLength: number = 60;
    validPattern: boolean;
    validMaxLength: boolean;
    validMinLength: boolean;
    isPasswordValid: boolean = true;
    passwordValidationClass: string;

    @Input('password') password: string;
    @Input('form') form;

    constructor() {
    }

    checkPasswordValidation() {
        this.validMinLength = this.form.hasError('min-length-validator', 'password') ? false : true;
        this.validMaxLength = this.form.hasError('max-length-validator', 'password') ? false : true;
        this.validPattern = this.form.hasError('pattern', 'password') ? false : true;
        this.isPasswordValid = this.validMinLength && this.validMaxLength && this.validPattern;
        this.passwordValidationClass = this.isPasswordValid ? "valid" : "inValid";
    }
    ngOnChanges() {
        this.checkPasswordValidation();
    }
}