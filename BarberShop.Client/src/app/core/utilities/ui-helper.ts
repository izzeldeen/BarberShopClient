import {Injectable} from "@angular/core";
import {formatDate} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import * as config from '../../configs/config';

@Injectable()
export class UIHelper {
    constructor(private translate: TranslateService) {
    }

    getDropdownItems(data: any[], dataTextField: string, dataValueField?: any | string, hasNoneOption?: boolean, hasNoneOptionLabel?: string) {
        let newData = [];

        if (hasNoneOption) {
            var label = hasNoneOptionLabel ? hasNoneOptionLabel : 'general.none';
            newData.push({viewValue: this.translate.instant(label), value: undefined});

        }

        for (let i = 0, len = data.length; i < len; i++) {
            var value = dataValueField ? data[i][dataValueField] : data[i];
            newData.push({viewValue: data[i][dataTextField], value: value});
        }

        return newData;
    }

    getCustomDropdownItems(data: any[], dataTextField: string, codeTextFiled: any | string, dataValueField?: any | string, hasNoneOption?: boolean, hasNoneOptionLabel?: string) {
        let newData = [];

        if (hasNoneOption) {
            var label = hasNoneOptionLabel ? hasNoneOptionLabel : 'general.none';
            newData.push({viewValue: this.translate.instant(label), value: undefined});

        }

        for (let i = 0, len = data.length; i < len; i++) {
            var value = dataValueField ? data[i][dataValueField] : data[i];
            var viewValue = (data[i][codeTextFiled]).toString() + " - " + data[i][dataTextField];
            newData.push({viewValue: viewValue, value: value});
        }

        return newData;
    }

    getDropdownItemsWithFullName(data: any[], dataTextFieldOne: string,dataTextFieldTwo: string, dataValueField?: any | string, hasNoneOption?: boolean, hasNoneOptionLabel?: string) {
        let newData = [];

        if (hasNoneOption) {
            var label = hasNoneOptionLabel ? hasNoneOptionLabel : 'general.none';
            newData.push({viewValue: this.translate.instant(label), value: undefined});

        }

        for (let i = 0, len = data.length; i < len; i++) {
            var value = dataValueField ? data[i][dataValueField] : data[i];
            newData.push({viewValue: data[i][dataTextFieldOne]+" "+data[i][dataTextFieldTwo], value: value});
        }

        return newData;
    }
    getLookupLabel() {
        return "label";
    }

    getUserLabel() {
        return "fullName";
    }

    getNameLabel() {
        return "name";
    }

    getFullNameLabel() {
        return "fullName";
    }
    
    getViewShippingSetup() {
        return "viewShippingSetup";
    }

    getDescriptionLabel() {
        return "description";
    }

    getAcountName() {
        return "accountName";
    }

    getLookupCode() {
        return "code";
    }

    getfirstNameLabel() {
        return "firstName";
    }

    getlastNameLabel() {
        return "lastName";
    }

    getIdLabel() {
        return "id";
    }
}
