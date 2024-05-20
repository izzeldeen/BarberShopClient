import { Injectable } from "@angular/core";
import { ServiceBase } from "./base.service";
import { ApiHelperService } from "./api-helper.service";
import { apiNames } from "../constants/api-names";
import { CategoryVM, CategoryVMFilter } from "../model/category/category.vm";


@Injectable()
export class CategoryService extends ServiceBase<CategoryVM, CategoryVMFilter> {

    constructor(protected apiHelper: ApiHelperService) {
        super(apiHelper, apiNames.Category)
    }


}