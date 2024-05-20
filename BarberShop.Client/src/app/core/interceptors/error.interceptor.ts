import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse,
    HttpStatusCode
} from '@angular/common/http';
import {tap} from 'rxjs';

import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LanguageModel} from "../models/language.model";
import {AuthenticationService} from "../services/authentication.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor  {
    selectedLanguage: LanguageModel = (localStorage.getItem('currentLanguage')) ? JSON.parse(localStorage.getItem('currentLanguage')) : new LanguageModel();
    errorHeader = 'Error';
    successHeader = 'Success';
    successBody = 'Data updated Successfully';

    constructor(
        private toastr: ToastrService,
        /* private translateService : TranslateService,*/
        public authenticationService: AuthenticationService,
        private router: Router) {
        this.selectedLanguage = (localStorage.getItem('currentLanguage')) ? JSON.parse(localStorage.getItem('currentLanguage')) : new LanguageModel();
        if (this.selectedLanguage.lang == 'ar') {
            this.errorHeader = 'خطأ';
            this.successHeader = 'نجاح';
            this.successBody = 'تم تحديث المعلومات بنجاح';
        } else {
            this.errorHeader = 'Error';
            this.successHeader = 'Success';
            this.successBody = 'Data updated Successfully';
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(tap(
            (event: any) => {

                if (event.type != 0) {
                    if (event.status == 200 && event?.body?.ResponseCode) {
                        this.toastr.error(event?.body?.ResponseDescription, this.errorHeader);
                    }
                    if (event.status == 200 && (event?.url.toLowerCase().includes('/update') || event?.url.toLowerCase().includes('/create')) && !event?.body?.ResponseCode) {
                        this.toastr.success(this.successBody, this.successHeader);
                    }
                }
                this.onSucceed(event)
            },
            error => this.onError(req, error)
        ));
    }

    onSucceed(event) {
    }

    async onError(req: HttpRequest<any>, error) {

        if (error instanceof HttpErrorResponse) {

             if(error.status == 401){
                this.router.navigate(['/authorization/sign-in']);
             }
            this.getResponseErrors(error).then(async (errors) => {

                let errorsList: any = errors;
                if (req.headers.get('skip-interceptor-error')) {
                    return null
                }

                for (let e of errorsList) {

                    if (e.error) {
                        if (e.status === HttpStatusCode.Unauthorized || e.status === HttpStatusCode.Forbidden) {
                            if (await this.authenticationService.isLoggedIn()) {
                                this.toastr.error(e.error[0].message, this.errorHeader);
                                this.router.navigate(['/authorization/sign-in']);
                                //this.router.navigate([this.themeService.merchantCode + '/portal/unauthorize']);
                            } else {
                                this.router.navigate(['/authorization/sign-in']);
                            }

                        } else if (e.status === HttpStatusCode.BadRequest) {

                            this.toastr.error(e.error.code, this.errorHeader);
                        } else if (e.status === HttpStatusCode.ServiceUnavailable) {
                            // this.router.navigate(['maintenance']);
                        } else if (e.status === HttpStatusCode.InternalServerError) {

                            this.toastr.error(errors[0].message, this.errorHeader);
                            // this.notifyService.showApiError('general.error', errors[0].message);
                        }
                    }
                    else {

                        this.toastr.error(e.errors[0].message, this.errorHeader);
                    }
                }
            });
            // some apis wants to ignore the error, to custom the mesasge


        }
    }

    async getResponseErrors(httpError: HttpErrorResponse) {
        return new Promise(resolve => {
            console.log(httpError)
            let errors: any[] = [];
            if (httpError.error) {
                const error: any = httpError.error;
                    if (Array.isArray(error)) {
                    if (error[0].code) {
                        errors.push(httpError);
                    }
                } else {
                    if (error.code) {
                        errors.push(httpError);
                    } else {
                        errors.push(error);
                    }
                }

            } else {
                errors = httpError.error;
            }
            resolve(errors);
        })

    }
}
