import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SpinnerService {
    constructor() {
    }

    isShowSpinner = new BehaviorSubject(false);

    showSpinner() {
        this.isShowSpinner.next(true);
    }

    hideSpinner() {
        this.isShowSpinner.next(false);
    }

    getSpinnerStatus() {
        return this.isShowSpinner;
    }
}
