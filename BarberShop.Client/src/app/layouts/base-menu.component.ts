
import {StorageManager} from "src/app/core/utilities/storage-manager";
import {Component} from '@angular/core';
import {BaseComponent} from "../shared/base.component";
import {NavItem} from "../shared/dto/nav-item";
import {SystemMenu} from "../shared/model/system-menu/system-menu.vm";
import {LocatorService} from "../core/services/locator.service";
import {AuthenticationService} from "../core/services/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import {StorageKey} from "../shared/enum/storage-key-enum";
@Component({
  template: '',

})
export class BaseMenuComponent extends BaseComponent {
  //items: NavItem[];
  isAuthunticated: boolean;
  username: string;
  dashboardArray: string[] = [];
  authenticationService : AuthenticationService;
  translate : TranslateService;
  constructor() {
    super()
    this.authenticationService = LocatorService.injector.get(AuthenticationService);
    this.translate = LocatorService.injector.get(TranslateService);
  }

  async ngOnInit() {
    super.ngOnInit();
    this.isAuthunticated = await this.authenticationService.isLoggedIn();
  }


  logout() {
    StorageManager.remove(StorageKey.AdminRedirectUrl);
    this.authenticationService.logout();
  }
}
