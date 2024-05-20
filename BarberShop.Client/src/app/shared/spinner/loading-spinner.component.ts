import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
    showSpinner: boolean = false;

    constructor(private spinnerSrevice: SpinnerService, private cdRef: ChangeDetectorRef) { }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        this.spinnerSrevice.isShowSpinner.subscribe(spinner => {
            this.showSpinner = spinner;
            this.cdRef.detectChanges();
        })
    }
}
