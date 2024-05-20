export class FilterBase {
    constructor() {
        this.pageIndex = 1;
        this.pageSize = 10;
        this.descendingDirection = true;

    }

    id?: any;
    pageIndex: number;
    pageSize: number;
    orderBy: string;
    storeId? :any
    descendingDirection: boolean;

}
