import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse,
} from '@angular/common/http';
import {from, Observable, tap, throwError} from 'rxjs';


import {environment} from '../../../environments/environment';
import {LanguageModel} from "../models/language.model";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    selectedLanguage: LanguageModel = (localStorage.getItem('currentLanguage')) ? JSON.parse(localStorage.getItem('currentLanguage')) : new LanguageModel();

    constructor(
        private authenticationService: AuthenticationService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     /*   const header = req.headers.set("Accept-Language", this.selectedLanguage.lang).set('XKey','637837535618550428-a5ffacpd-783n-4391-a9ff-467d4a8cce98')
        const anonymousReq = req.clone({
            headers: header
        });
        if (req.headers.get("skip-authorization") || req.headers.get("authorization")) {
            return next.handle(anonymousReq);
        }

        return from(this.authenticationService.getAccessToken().then((accessToken) => {
            if (!accessToken) {
                return next.handle(req).toPromise();
            }

            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
            });

            return next.handle(authReq).toPromise();
        }));*/



        if (req.headers.get('skip-authorization') || req.headers.get('authorization')) {
            return next.handle(req);
        }

        if (!req.url.toLowerCase().includes(environment.serviceUrl.toLowerCase())) {
            return next.handle(req);
        }

        //@ts-ignore
        return from(this.authenticationService.getAccessToken().then((accessToken) => {
            if (!accessToken) {
                return next.handle(req).toPromise();
            }
            let authReq = null;
            if (req) {
                authReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
                });
                return next.handle(authReq).toPromise();
            } else {
                return next.handle(req).toPromise();
            }
        }));

    }
}
