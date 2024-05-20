import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/base.component';
import { IdentityService } from '../../../shared/services/identity.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-verified-success',
    templateUrl: './verified-success.component.html',
    styleUrls: ['./verified-success.component.scss']
})
export class VerifiedSuccessComponent extends BaseComponent implements OnInit {
    userId: string;
    showSuccess: boolean = true;

    constructor(
        private identityService: IdentityService,
        public translate: TranslateService,) {
        super();

        this.activatedRoute.queryParams.subscribe(params => {
            this.userId = params['i'];
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.activateUser();
    }

    activateUser() {

        var headers = new HttpHeaders().set('skip-authorization', 'true')
            .set("Accept-Language", this.getCurrentLanguage());

        this.identityService.activateUser(this.userId, headers).subscribe(
            (result) => {
                this.toaster.success(this.translate.instant('general.activateSuccessfully'), this.translate.instant('GENERAL.SUCCESS'));

            },
            (error) => {
                this.showSuccess = false;
                console.log(error.error.errors[0]);
            }
        );
    }
}

