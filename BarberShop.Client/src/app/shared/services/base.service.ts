import {environment} from "src/environments/environment";
import {EntityBase} from '../model/entity-base.vm';
import {FilterBase} from "src/app/shared/model/filter-base";
import {ApiHelperService} from "./api-helper.service";
import {PageSearchResult} from "../dto/search-result";


export class ServiceBase<TEntity extends EntityBase, TFilters extends FilterBase> {
    apiUrl: string;

    constructor(protected apiHelper: ApiHelperService, serviceURi: string) {
        this.setApiUrl(serviceURi);
    }

    setApiUrl(apiUrl) {
        this.apiUrl = environment.serviceUrl + apiUrl;
    }

    getAll(filter?: TFilters): any {

        const url = this.apiUrl + this.filterToQuery(filter);

        return this.apiHelper.get<PageSearchResult<any>>(url);
    }

    getDDL(filter?: TFilters) {

        const url = this.apiUrl + '/ddl' + this.filterToQuery(filter);

        return this.apiHelper.get<PageSearchResult<TEntity>>(url);
    }

    getByID(id: number) {
        return this.apiHelper.get<any>(this.apiUrl + '/' + id);
    }

    add(entity: TEntity) {

        var getValue = (value) => {
            let val = value;
            if (typeof value == 'string') {
                val = val.trim();
            }
            return val;
        };

        Object.keys(entity).map(key => entity[key] = getValue(entity[key]));

        return this.apiHelper.post<TEntity, any>(this.apiUrl, entity);
    }

    addWithAttachment(entity: any, attachment: any, attachmentAttributes: any) {
        return this.apiHelper.postWithAttachments<any>(this.apiUrl + "/attachment", entity, attachment, attachmentAttributes);
    }

    edit(entity: TEntity) {

        var getValue = (value) => {
            let val = value;
            if (typeof value == 'string') {
                val = val.trim();
            }
            return val;
        };

        Object.keys(entity).map(key => entity[key] = getValue(entity[key]));

        return this.apiHelper.put<TEntity, any>(this.apiUrl, entity);
    }

    editWithAttachment(entity: any, attachment: any, attachmentAttributes: any, deletedIds: any) {
        return this.apiHelper.putWithAttachments<any>(this.apiUrl + "/attachment", entity, attachment, attachmentAttributes, deletedIds);
    }

    delete(id: number) {
        return this.apiHelper.delete<any>(this.apiUrl + '/' + id.toString());
    }


    pdfexport(filter?: TFilters) {
        return this.apiHelper.getBlobPost(this.apiUrl + '/pdf-export', filter);
    }

    excelExport(filter?: TFilters) {
        return this.apiHelper.getBlobPost(this.apiUrl + '/excel-export', filter);
    }

    excelExportWithQueryFilter(filter?: TFilters) {
        return this.apiHelper.getBlob(this.apiUrl + '/excel-export' + this.filterToQuery(filter));
    }

    getExcelTemplate(templateCode) {
        var apiUrl = environment.serviceUrl + "excel-templates" + "/get-template-by-code/" + templateCode;
        return this.apiHelper.get<any>(apiUrl);
    }

    filterToQuery(filter): string {
        // this to stop browser cache in case of the get request.
        var buster = "nc" + Math.random() + "=1";
        var params = "?" + buster;
        if (filter) {
            var getValue = (value) => {
                let val = value instanceof Date ? value.toISOString() : value
                return val;
            };
            const paramsArray = [];
            let filterParams = '';
            Object.keys(filter).forEach((k) => {
                if (filter[k] == null || filter[k] == 'null') {
                    delete filter[k]
                } else {
                    filterParams += "&" + k + '=' + getValue(filter[k])
                }
            });

            params += filterParams;
        }
        return params;
    }
}
