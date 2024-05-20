import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {SpinnerService} from '../../shared/spinner/spinner.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    spinnersCount = 0;

    constructor(public spinnerService: SpinnerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!req.headers.get("silent-call")) {
            this.showSpinner();
        }

        return next.handle(req).pipe(tap(
            event => this.onSucceed(req, event),
            error => this.onError(req, error)
        ));
    }

    onSucceed(req: HttpRequest<any>, event) {
        if (event instanceof HttpResponse) {
            if (!req.headers.get("silent-call")) {
                this.hideSpinner();
            }
        }
    }

    onError(req: HttpRequest<any>, error) {
        if (!req.headers.get("silent-call")) {
            this.hideSpinner();
        }
    }

    showSpinner() {
        this.spinnersCount++;
        this.spinnerService.showSpinner();
    }

    hideSpinner() {
        this.spinnersCount--;
        if (this.spinnersCount <= 0) {
            this.spinnerService.hideSpinner();
        }
    }
}
