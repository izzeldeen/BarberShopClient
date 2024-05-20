import { Injectable } from "@angular/core";
import { TransactionFilter, TransactionVM } from "../model/transaction/transaction.vm";
import { ServiceBase } from "./base.service";
import { ApiHelperService } from "./api-helper.service";
import { apiNames } from "../constants/api-names";


@Injectable()
export class TransactionService extends ServiceBase<TransactionVM, TransactionFilter> {

    constructor(protected apiHelper: ApiHelperService) {
        super(apiHelper, apiNames.transaction)
    }


}