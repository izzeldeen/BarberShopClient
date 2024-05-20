import {HeaderTypes} from "./enums";

export class DataTable<T = any> {
    headers: HeaderDetails[];
    data: Array<T> = new Array<T>();
    dataCount: any;
    options?: Options;
    methods?: Methods<T>;
    isLoading = false;

    actions?: Array<TableAction> = [];
}

export class HeaderDetails {
    key: string;
    display: string;
    type?: HeaderTypes = HeaderTypes.Any;
    sortingColumn?: string;
    canCopy?: boolean;
    customClass?: string;
    dependingKey?:string;
    displayResults?: string;
    translate?:boolean = false;
    keysToMerge?: Array<{key : string, label?: string}>
}

export class Options {
    isHaveAction? = false;
    retrieveAllObject?: boolean = true;
    isHaveDetails?: boolean = false;
    isSelectable?: boolean = false;
}

export interface Methods<T = any> {

    Search?(pageSize: any, pageIndex: any): any;

    OnSelect?(row: any): any;

}


export class TableAction {
    iconName: string = 'fas fa-plus-squar';
    name?: string = 'new action';
    permission: boolean;
    dependingKey?:string;
    callBack?(row: any): any;


}
