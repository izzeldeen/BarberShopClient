export class ServiceOperationResult<TEntity> {
    collection: Data<TEntity>;
    constructor() {
       
        this.collection = new Data();
    }
}

export class Data<TEntity> {
    data: Array<TEntity>;
    numberOfRecords: any;

    constructor() {
        this.data = [];
        this.numberOfRecords = 0;
    }
}


export class TableResult {
    items: Array<any> = [];
    count: number = 0;
    page: number = 0;
    totalCount: number = 0;
    totalPages: number = 0;


}
