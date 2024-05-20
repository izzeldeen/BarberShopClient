// import { ApiHelperService } from 'src/app/core/services/api-helper.service';
// import { Injectable } from '@angular/core';
// import { apiNames } from '../constants/api-names';
// import { environment } from 'src/environments/environment';

// @Injectable()
// export class PrintService {
//     printApiURL: string;

//     constructor(private apiHelper: ApiHelperService) {
//         this.printApiURL = environment.serviceUrl + apiNames.print;
//     }

//     printRequests = (batchReferenceNumber: string, type: string) => {
//         return this.apiHelper.post<any, any[]>(this.printApiURL + "/receipt", { referenceNumber: batchReferenceNumber, printType: type });
//     }

//     getPrintFile(printUrl) {
//         return this.apiHelper.getBlob(printUrl);
//     }
// }