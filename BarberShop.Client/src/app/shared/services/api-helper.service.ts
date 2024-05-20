import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, finalize} from 'rxjs/operators';
import {TranslateService} from "@ngx-translate/core";
import {formatDate} from "@angular/common";


@Injectable({providedIn: 'root'})
export class ApiHelperService {
    language = JSON.parse(localStorage.getItem('currentLanguage')) != null ? JSON.parse(localStorage.getItem('currentLanguage')).lang ?
        JSON.parse(localStorage.getItem('currentLanguage')).lang : 'en' : 'en';

    constructor(public http: HttpClient) {
    }

    protected getFileRequestHeaders(customHeader: HttpHeaders): HttpHeaders {
        if (!customHeader) {
            customHeader = new HttpHeaders();
        }
        let headers = customHeader
            .set("Accept", "application/json")
            .set("Accept-Language", this.language)
            .set("lang", this.language)
        return headers;
    }

    protected getRequestHeaders(customHeader: HttpHeaders): HttpHeaders {
        if (!customHeader) {
            customHeader = new HttpHeaders();
        }
        let headers = customHeader.set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Accept-Language", this.language)
            .set("lang", this.language)
        return headers;
    }

    postWithStringParams<TData, TResponse>(uri: string, data: TData, options?: {}, headers?: HttpHeaders): Observable<TResponse> {

        let content: any = data;
        if (!options) {
            options = {
                headers: this.getRequestHeaders(headers)
            };
            content = JSON.stringify(data)
        }
        return this.http.post(uri, content, options).pipe(
            map((res: TResponse | any) => {
                return res;
            }),
            catchError((error: any) => {
                console.log(error)
                return error;
            }),
            finalize(() => {
                return true
            }));
    }

    post<TData, TResponse>(uri: string, data: TData, options?: {}, headers?: HttpHeaders): Observable<TResponse> {

        let content: any = data;
        if (!options) {
            options = {
                headers: this.getRequestHeaders(headers)
            };
            // content = JSON.stringify(data)
        }
        return this.http.post(uri, content, options).pipe(
            map((res: TResponse | any) => {
                return res;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            finalize(() => {
                return this.handleFinally();
            })); 
       
    }
     
    get<TResponse>(uri: string, params = new HttpParams(), headers?: HttpHeaders): Observable<TResponse> {
        let options = {
            params: params,
            headers: this.getRequestHeaders(headers)
        };
        return this.http.get(uri, options).pipe(
            map((res: TResponse | any) => {
                return res
            }),
            catchError((error: any) => {
                return error;
            }),
            finalize(() => {
                return true
            }));
    }

    delete<TResponse>(uri: string, params = new HttpParams(), headers?: HttpHeaders): Observable<TResponse> {
        var options = {
            params: params,
            headers: this.getRequestHeaders(headers)
        };

        return this.http.delete(uri, options).pipe(
            map((res: TResponse | any) => {
                return res;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            finalize(() => {
                this.handleFinally();
            }));
    }

    put<TData, TResponse>(uri: string, data: TData, params = new HttpParams(), headers?: HttpHeaders): Observable<TResponse> {
        var options = {
            params: params,
            headers: this.getRequestHeaders(headers)
        };

        return this.http.put(uri, JSON.stringify(data), options).pipe(
            map((res: TResponse | any) => {
                return res;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            finalize(() => {
                this.handleFinally();
            }));
    }

    putWithAttachments<TResponse>(uri: string, content: any, attachments, attachmentAttributes: any, deletedIds: any, options?: {}, headers?: HttpHeaders): Observable<TResponse> {
        const form = new FormData();
        for (var i in attachments) {
            form.append('files', attachments[i].file, attachments[i].fileName);
        }
        delete content.UserAttachments;
        form.append('attributes', JSON.stringify(attachmentAttributes));
        form.append('deletedIds', JSON.stringify(deletedIds));
        form.append('entity', JSON.stringify(content));
        options = {
            headers: this.getFileRequestHeaders(headers)
        };

        return this.http.put(uri, form, options).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            finalize(() => {
                this.handleFinally();
            }));
    }

    postWithAttachments<TResponse>(uri: string, content: any, attachments, attachmentAttributes: any, options?: {}, headers?: HttpHeaders): Observable<TResponse> {
        const form = new FormData();
        for (var i in attachments) {
            form.append('files', attachments[i].file, attachments[i].fileName);
        }
        delete content.UserAttachments;
        form.append('attributes', JSON.stringify(attachmentAttributes));
        form.append('entity', JSON.stringify(content));
        options = {
            headers: this.getFileRequestHeaders(headers)
        };

        return this.http.post(uri, form, options).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            finalize(() => {
                this.handleFinally();
            }));
    }

    filterToQuery(filter): string {
        // this to stop browser cache in case of the get request.
        var buster = "nc" + Math.random() + "=1";
        var params = "?" + buster;
        if (filter) {
            let val
            let getValue = (value) => {
                if (this.isIsoDate(value)) {
                    const date = new Date(value);
                    val = formatDate(<Date>date, "MM/dd/yyyy", "en-us").toString();
                } else {
                    val = value
                }
                return val;
            };
            var filterParams = Object.keys(filter).map(key => key + '=' + getValue(filter[key])).join('&');
            params += "&" + filterParams;
        }
        return params;

    }

    isIsoDate(str: any) {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
            return false;
        }
        const d = new Date(str);
        return d instanceof Date && d.toISOString() === str;
    }

    getBlobPost<TData>(uri: string, data: TData) {
        var options: any = {
            responseType: 'blob',
            headers: {'Accept-Language': this.language}
        };
        return this.http.post<Blob>(uri, data, options);
    }

    getBlob(uri: string, params?: HttpParams) {
        var options: any = {
            params: params,
            responseType: 'blob',
            headers: {'Accept-Language': this.language, "lang": this.language}
        };

        return this.http.get(uri, options);

    }

    private handleFinally() {
    }

    private handleError(httpErrorResponse: HttpErrorResponse) {
        return throwError(httpErrorResponse);
    }


    getCurrentLanguage() {
        const lang = localStorage.getItem('currentLanguage');
        if (lang) {
            return JSON.parse(lang).lang;
        } else {
            return 'en'
        }
    }


}
