import {OnInit, OnDestroy, Component, EventEmitter} from '@angular/core';
import {LocatorService} from "../core/services/locator.service";
import {ActivatedRoute, NavigationEnd, NavigationStart, RouteConfigLoadStart, Router,} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {LanguageModel} from "../core/models/language.model";
import {TranslateService} from "@ngx-translate/core";
import {Arabic} from "flatpickr/dist/l10n/ar";
import english from "flatpickr/dist/l10n/default";
import * as CryptoJS from 'crypto-js';
import {ToastrService} from "ngx-toastr";
import {UserClaimType} from "./enum/user-claim-type.enum";
import {AuthenticationService} from "../core/services/authentication.service";
import {UIHelper} from "../core/utilities/ui-helper";
import {query} from "@angular/animations";

@Component({
    template: '',
})
export class BaseComponent implements OnInit, OnDestroy {
    fullName = '';
    uiHelper: UIHelper;
    listLang: Array<LanguageModel> = [
        {text: 'English', flag: 'assets/images/flags/us.png', lang: 'en'},
        {text: 'العربية', flag: 'assets/images/flags/ksa.png', lang: 'ar'},
    ];
    router: Router;
    translate: TranslateService;
    activatedRoute: ActivatedRoute;
    toaster: ToastrService;
    authenticationService: AuthenticationService;
    direction: string = 'en';
    ngTitle: Title;
    title: string;
    selectedLanguage: LanguageModel = (localStorage.getItem('currentLanguage')) ? JSON.parse(localStorage.getItem('currentLanguage')) : new LanguageModel();
    public languages: string[] = ['en', 'ar'];
    encryptSecretKey = "o458712369bsdf26";
    error;

     currentUserPermissions: string[];

    constructor() {
        this.authenticationService = LocatorService.injector.get(AuthenticationService);
        this.onGetPermissions()
        this.router = LocatorService.injector.get(Router);
        this.activatedRoute = LocatorService.injector.get(ActivatedRoute);
        this.ngTitle = LocatorService.injector.get(Title);
        this.toaster = LocatorService.injector.get(ToastrService);
        this.uiHelper = LocatorService.injector.get(UIHelper);
        this.translate = LocatorService.injector.get(TranslateService);
        this.router.events.subscribe({
            next: (event) => {
                if (event instanceof NavigationEnd) {
                    let uri = JSON.parse(JSON.stringify(this.router.url)).split('/');
                    const a = uri[uri.length - 1];
                    const queryIndex = a.indexOf("?");
                    if (queryIndex != -1) {
                        uri = a.substring(0, queryIndex);
                    } else {
                        uri = a;
                    }
                    this.title = 'MENU.' + uri.toString().toUpperCase();
                }
                /* if (event.url)
                 this.title = this.ngTitle.getTitle();*/
            }
        })
    }

    ngOnInit(): void {
        this.translate.addLangs(this.languages);
        this.checkLanguage();
    }


    async onGetPermissions() {
       this.authenticationService.getClaim(UserClaimType.Permission).then(pers => {
        this.currentUserPermissions = pers;
       });
    }

    ngOnDestroy(): void {
    }


    decode(v: string): string {
        return decodeURIComponent(v);
    }

    encode(v: string): string {
        var decodedUrl = this.decode(v);
        return encodeURIComponent(decodedUrl);
    }

    jsonCopy(src: any) {
        return JSON.parse(JSON.stringify(src));
    }

    public setLanguage(updatedLanguage: LanguageModel) {
        this.selectedLanguage = updatedLanguage;
        localStorage.setItem('currentLanguage', JSON.stringify(updatedLanguage))
        window.location.reload();
    }

    public checkLanguage() {
        this.selectedLanguage = (localStorage.getItem('currentLanguage')) ? JSON.parse(localStorage.getItem('currentLanguage')) : new LanguageModel();
        let html: HTMLCollection = document.getElementsByTagName('html');
        this.translate.use(this.selectedLanguage.lang);
        if (this.selectedLanguage.lang == 'ar') {
            this.direction = "rtl";
            html[0].setAttribute('dir', 'rtl');
        } else {
            this.direction = "ltr";
            html[0].setAttribute('dir', 'ltr');
        }
    }

    getLanguage() {
        const lang = JSON.parse(localStorage.getItem('currentLanguage')).lang;
        return lang;
    }

    getCalenderTranslate() {
        if (this.selectedLanguage.lang == "ar") {
            return Arabic
        } else {
            return english
        }
    }

    decryptData(data) {
        try {
            let key = CryptoJS.enc.Utf8.parse(this.encryptSecretKey);
            let iv = CryptoJS.enc.Utf8.parse(this.encryptSecretKey);

            var plaintext = CryptoJS.AES.decrypt(data, key,
                {
                    keySize: 128,
                    blockSize: 128,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            let x = CryptoJS.enc.Utf8.stringify(plaintext);
            let y = String.fromCharCode.apply(null, plaintext);
            return x;
        } catch (e) {
        }
    }

    encryptData(data) {
        try {

            let key = CryptoJS.enc.Utf8.parse(this.encryptSecretKey);
            let iv = CryptoJS.enc.Utf8.parse(this.encryptSecretKey);
            var encrpted = CryptoJS.AES.encrypt(data, key,
                {
                    keySize: 128,
                    blockSize: 128,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });

            let encrptedText = CryptoJS.enc.Utf8.parse(encrpted)
            return CryptoJS.enc.Utf8.stringify(encrptedText);

        } catch (e) {
        }
    }

    getCurrentLanguage() {
        const lang = localStorage.getItem('currentLanguage');
        if (lang) {
            return JSON.parse(lang).lang;
        } else {
            return 'en'
        }
    }

    hasPermission(permissions: string | string[]): any {
        return true;
        // if (this.currentUserPermissions) {
        //     if (Array.isArray(permissions)) {
        //         return this.currentUserPermissions.some(pemission => permissions.some(p => p.toUpperCase() == pemission.toUpperCase()));
        //     } else {
        //         return this.currentUserPermissions.some(pemission => permissions.toUpperCase() == pemission.toUpperCase());
        //     }
        // }
    }

    base64ToArray(base64: string) {
        let binary_string = window.atob(base64);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    translateByKey(key: string): string {
        return this.translate.instant(key);
    }
  

}
