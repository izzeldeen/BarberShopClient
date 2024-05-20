import { Component, Injectable, Inject } from '@angular/core';
import { BaseComponent } from './base.component';
import { ServiceBase } from "./services/base.service";
import { DataTable } from "./responsive-table/interfaces";
import { EntityBase } from "./model/entity-base.vm";
import { FilterBase } from "./model/filter-base";
import { ServiceOperationResult } from "./model/service-operation-result";
import { Subscription } from 'rxjs';
import { UserClaimType } from './enum/user-claim-type.enum';


@Injectable()
@Component({
    template: '',
})
export abstract class ListComponent<TEntity extends EntityBase, TFilter extends FilterBase> extends BaseComponent {
    tableCollection: DataTable = {
        data: [],
        dataCount: 0,
        headers: [],
        options: {
            isHaveAction: false,
        },
        methods: {
            Search: (pageSize, pageIndex) => {
                this.filter.pageSize = pageSize;
                this.filter.pageIndex = pageIndex;
                this.loadEntities();
            }
        },
        actions: [],
        isLoading: false
    };
    filter: TFilter;
    activeFilter: TFilter;
    lookups: any;
    activeIds = "collapse-search";
    autoLoad = true;
    storeId = null;
    subscription: Subscription;

    constructor(protected serviceBase: ServiceBase<TEntity, TFilter>,
        @Inject('filterType') public filterType: new () => TFilter) {
        super();

       
                this.filter = new this.filterType();
                this.activeFilter = new this.filterType();
       
    }

    ngOnInit() {
        super.ngOnInit();
        const p = this.activatedRoute.snapshot.queryParamMap.get('filter');
        if (!p) {
            if (!this.filter) {
                this.filter = new this.filterType();
                this.activeFilter = new this.filterType();
            }
            this.loadEntities();
                
            
        } else {
            const params = p;
            this.filter = JSON.parse(this.decode(params));
            this.activeFilter = this.jsonCopy(this.filter);
            this.loadEntities();
        }
    }

    onRoute(queryFilter) {
        if (queryFilter) {
            this.filter = JSON.parse(queryFilter);
            this.activeFilter = this.jsonCopy(this.filter);
            this.loadEntities();
        }
    }

    pageChanged(e) {
        this.activeFilter.pageSize = e.pageSize;
        this.activeFilter.pageIndex = e.pageIndex;
        this.filter.pageSize = e.pageSize;
        this.filter.pageIndex = e.pageIndex;
        this.loadEntities();
    }

    loadEntities() {
            this.getAll();
    }

    getAll() {
            this.tableCollection.isLoading = true;
            let filterParams = this.encode(JSON.stringify(this.filter));
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: { filter: filterParams },
                queryParamsHandling: 'merge'
            });

            this.activeFilter = this.jsonCopy(this.filter);
            this.serviceBase.getAll(this.activeFilter).subscribe(
                (response: any) => {
                    this.tableCollection.data = response.data.collection;
                    this.tableCollection.dataCount = response.data.numberOfRecords;
                    this.tableCollection.isLoading = false;
                    this.lookups = response;
                }
            );
    }

    onStoreChange() {

    }

    search() {
        this.filter.pageIndex = 0;
        this.filter.pageSize = 10;
        this.activeFilter = this.jsonCopy(this.filter);
        this.loadEntities();
    }

    reset() {
        this.filter = new this.filterType();
        this.activeFilter = new this.filterType();
        this.clearQueryParams();
        this.loadEntities();
    }

    clearQueryParams() {
        // clear query params
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {},
            skipLocationChange: false
        });
    }
    manageItem(item?: TEntity) {
        this.filter.id = item?.id ? item.id : 0;
        let filterParams = this.encode(JSON.stringify(this.filter));
        const urlTree = this.router.parseUrl(this.router.url);
        let urlWithoutParams: any = urlTree.root.children['primary'].segments.map(it => it.path);
        // urlWithoutParams.pop();
        urlWithoutParams.join('/');
        this.router.navigate([urlWithoutParams.join('/'), 'manage'], {
            relativeTo: this.activatedRoute,
            queryParams: { filter: filterParams },
            queryParamsHandling: 'merge'
        });
    }

    // manageItem(item?: TEntity) {
    //     this.filter.id = item?.id ? item.id : 0;
    //     let filterParams = JSON.stringify(this.filter);
    //     const urlTree = this.router.parseUrl(this.router.url);
    //     let urlWithoutParams: any = urlTree.root.children['primary'].segments.map(it => it.path);
    //     // urlWithoutParams.pop();
    //     urlWithoutParams.join('/');
    //     this.router.navigate([urlWithoutParams.join('/'), 'manage'], {
    //         relativeTo: this.activatedRoute,
    //         queryParams: { filter: filterParams },
    //         queryParamsHandling: 'merge'
    //     });
    // }

    onDeleteItem(item: TEntity) {
        return new Promise((resolve) => {
            this.serviceBase.delete(item.id).subscribe(
                (result) => {
                    if(result.resultCode == 200){
                        this.loadEntities();
                        resolve(true);
                    }else {
                        this.toaster.error(this.translate.instant('general.error'), result.errorMessage);

                    }
                   
                },
                (error) => {
                    resolve(false);
                    this.toaster.error(this.translate.instant('general.error'), this.translate.instant(error.error[0].message));
                }
            );
        })

    }

    onPDFExport(name) {
        this.activeFilter = this.jsonCopy(this.filter);
        this.serviceBase.pdfexport(this.activeFilter).subscribe(
            (data: any) => {

                const objectUrl: string = URL.createObjectURL(data);
                const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

                a.href = objectUrl;
                a.download = this.translate.instant(name) + '.pdf';
                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);
                URL.revokeObjectURL(objectUrl);
            },
            (error) => {
                // this.notifyService.showApiError('general.error', error.error[0].message);
            }
        );
    }

    onExcelExport(name) {

        this.activeFilter = this.jsonCopy(this.filter);
        this.serviceBase.excelExport(this.activeFilter).subscribe(
            (data: any) => {

                const objectUrl: string = URL.createObjectURL(data);
                const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

                a.href = objectUrl;
                a.download = this.translate.instant(name) + '.xlsx';
                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);
                URL.revokeObjectURL(objectUrl);
            },
            (error) => {
                // this.notifyService.showApiError('general.error', error.error[0].message);
            }
        );
    }

    ngOnDestroy() { 
  
    }

}
