import { EntityBase } from '../entity-base.vm';
import { FilterBase } from '../filter-base';

export class ImportData extends EntityBase {
    code: string;
    value: string;
    fileType: string;
    createdBy: number;
}

export class ImportDataFilter extends FilterBase {
    constructor() {
        super();
    }
}