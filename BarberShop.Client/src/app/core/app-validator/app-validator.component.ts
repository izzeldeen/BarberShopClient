import {Component, ElementRef, Input} from '@angular/core';
import {NgForm, AbstractControlDirective, AbstractControl} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-validator',
    template: `
        <ul *ngIf="shouldShowErrors()" class="p-0">
            <li class="d-flex invalid-feedback " *ngFor="let error of listOfErrors() let i =index">
                <!--  <span class="pl-1 pr-1" *ngIf="i > 0">,</span>-->
                <span class=" px-1 text-capitalize">{{error}}</span>
            </li>
        </ul>
    `,
    styleUrls: ['./app-validator.component.css'],
})

export class AppValidatorComponent {


    @Input() control: AbstractControlDirective | AbstractControl;
    input: ElementRef | any;
    @Input() forms: NgForm;
    @Input() controlName: string;

    constructor(public translationService: TranslateService) {
    }

    shouldShowErrors(): boolean {
        let showErrors = false;

        if (!this.control && !this.forms) {
            this.control = this.forms.controls[this.controlName];
        }

        let control: any = this.control;
        this.input = control;
        if (this.control && this.control.errors) {
            if ((control.formDirective && control.formDirective.submitted) || (this.forms && this.forms.submitted)) {
                showErrors = this.control.invalid;
            } else {
                // showErrors = this.control.dirty || this.control.touched;
            }
        }

        return showErrors;
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
        const walletNumber = new RegExp('^\\d{9}$');
        if (params.messageKey) {
            return this.translationService.instant(params.messageKey);
        } else if (params.message) {
            return params.message;
        } else if (type === 'pattern' && params.requiredPattern == "^\\d{9}$" && !walletNumber.test(params.actualValue)) {
            return this.translationService.instant('invalidwalletNumber');
        } else {
            return this.translationService.instant(type) + this.getParam(params);
        }

    }

    private getParam(params: any) {
        if (params.requiredLength) {
            return params.requiredLength;
        } else if (params.requiredPattern) {
            return params.requiredPattern;
        } else if (params.message) {
            return params.message;
        } else {
            return '';
        }
    }
}
