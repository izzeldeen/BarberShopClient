import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})


export class LayoutComponent implements OnInit {


    constructor() {
    }

    ngOnInit() {
        this.onSetLayout();
    }

    ngAfterViewInit() {
    }


    onSetLayout() {
        document.body.setAttribute("data-layout-mode", "light");
        document.body.setAttribute("data-topbar", "light");
        document.body.setAttribute("data-sidebar", "light");
        document.body.setAttribute("data-layout-size", "fluid");
        document.body.setAttribute("data-layout-scrollable", "false");
        document.body.setAttribute("data-topbar", "light");
        document.body.setAttribute('data-sidebar-size', 'lg');
        document.body.setAttribute("data-sidebar", "brand");
    }


}
