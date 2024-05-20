import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BaseComponent} from "../../shared/base.component";
import {IdentityService} from "../../shared/services/identity.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {LanguageEnum} from "../../shared/enum/language-enum";
import {UserClaimType} from "../../shared/enum/user-claim-type.enum";
import {ModuleCode} from "../../shared/enum/module-code-enum";
import {StorageKey} from "../../shared/enum/storage-key-enum";
import {StorageManager} from '../../core/utilities/storage-manager';
import {GroupsEnum, GroupsStringEnum} from '../../shared/enum/groups-enum';


@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar Component
 */
export class TopbarComponent extends BaseComponent implements OnInit {
    //fullName = '';
    mode: string | undefined;
    @Output() mobileMenuButtonClicked = new EventEmitter();
    

    constructor(
        public identityService: IdentityService,
        public authenticationService: AuthenticationService,
        public translate: TranslateService
        
    ) {
        super();
        this.getUserClaims();
    }

    ngOnInit(): void {
    }

    async getUserClaims() {

      
    }


    checkLanguage() {
    }

    toggleMobileMenu(event: any) {
        event.preventDefault();
        this.mobileMenuButtonClicked.emit();
    }

    logout() {
        this.authenticationService.logout(ModuleCode.Admin);
        //this.router.navigate([this.themeService.merchantCode +'/admin/login']);
        this.router.navigate(['/authorization/sign-in']);

        StorageManager.set(StorageKey.AdminRedirectUrl, "");
      
    }
    navigateToDashboard(){
        this.router.navigate(['/admin/dashboard'])
    }
 


   


}
