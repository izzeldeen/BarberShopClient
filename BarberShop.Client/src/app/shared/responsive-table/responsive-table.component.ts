import {Component, ElementRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {HeaderTypes} from './enums';
import {DataTable} from "./interfaces";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {DatesFormat} from "./globals.const";
import {NgbOffcanvas, NgbPopover} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-responsive-table',
    templateUrl: './responsive-table.component.html',
    styleUrls: ['./responsive-table.component.scss']
})
export class ResponsiveTableComponent   {
    @Input() placeHolderSearchText: string;
    @Input() dataOfTable: DataTable;
    detailsInfo: any;
    @ViewChild('SearchInput', {static: false}) SearchInput: ElementRef;
    search: any = '';
    pageSize: number = 10;
    pageSizeOptions: any[] = [5, 10, 50, 100];
    @Input() pageIndex = 0;
    columnsLength = 0;
    Array = Array;
    datesFormat = DatesFormat;
    HeaderTypes = HeaderTypes;
    isAscSorting = false;
    sortingColumn = null;


    constructor(public translate: TranslateService,
                private offcanvasService: NgbOffcanvas,
                public toastr: ToastrService) {
    }
   


    ngOnInit(): void {


        this.dataOfTable.headers.forEach(header => {
            if (!header.type) {
                header.type = HeaderTypes.Any;
            }
        });

        if (this.dataOfTable.dataCount) {
            if (this.dataOfTable.dataCount < 5) {
                this.pageSizeOptions = [1, this.dataOfTable.dataCount]
            }
            if (this.dataOfTable.dataCount > 5 && this.dataOfTable.dataCount < 10) {
                this.pageSizeOptions = [1, 5, this.dataOfTable.dataCount]
            }
            if (this.dataOfTable.dataCount > 10 && this.dataOfTable.dataCount < 25) {
                this.pageSizeOptions = [1, 5, 10, this.dataOfTable.dataCount]
            }
            if (this.dataOfTable.dataCount > 25 && this.dataOfTable.dataCount < 50) {
                this.pageSizeOptions = [1, 5, 10, 25, this.dataOfTable.dataCount]
            }
            if (this.dataOfTable.dataCount > 50 && this.dataOfTable.dataCount < 100) {
                this.pageSizeOptions = [1, 5, 10, 25, 50, this.dataOfTable.dataCount]
            }
            if (this.dataOfTable.dataCount > 100) {
                this.pageSizeOptions = [1, 5, 10, 25, 50, 100]
            }

            this.pageSizeOptions.push()
        }
    }

    reloadData(newPageNumber: any): void {
        if (newPageNumber) {
            this.pageIndex = newPageNumber - 1;
        } else {
            this.pageIndex = 0;
        }
        this.dataOfTable.methods.Search(this.pageSize, (this.pageIndex + 1));
    }


    isEllipsisActive(e, popOver: NgbPopover): void {
        popOver.disablePopover = e.target.offsetWidth >= e.target.scrollWidth;
    }

    trackByFn(index, item): any {
        return item;
    }

    onViewDetails(row: any, content: TemplateRef<any>) {
        this.detailsInfo = row;
        console.log(Object.keys(this.detailsInfo));
        this.offcanvasService.dismiss();
        this.offcanvasService.open(content, {backdrop: 'static', position: 'end'});
    }

    onCopyValue(str: string) {
        navigator.clipboard.writeText(str);
        this.toastr.success('', this.translate.instant('GENERAL.COPIED'));

    }

    onGetColSpan() {
        this.columnsLength = this.dataOfTable.headers.length;
        if (this.dataOfTable.options.isHaveAction) {
            this.columnsLength++;
        }
        return this.columnsLength;
    }
}
