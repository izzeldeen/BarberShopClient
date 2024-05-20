import {Injectable, TemplateRef, ViewChild} from "@angular/core";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {Keepalive} from "@ng-idle/keepalive";
import {TranslationService} from "angular-l10n";
import {LocatorService} from "../../core/services/locator.service";
import {StorageManager} from "../../core/utilities/storage-manager";
import {StorageKey} from "../enum/storage-key-enum";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {IdleDialogComponent} from '../components/idle-dialog/idle-dialog.component';
import {IdentityService} from './identity.service';
import {ModuleCode} from '../enum/module-code-enum';
import {UserClaimType} from '../enum/user-claim-type.enum';
import {ThemeService} from "./theme.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  translation: TranslationService;
  authenticationService: AuthenticationService;
  router: Router;
  dialog: MatDialog;
  idle: Idle;
  keepalive: Keepalive;
  identityService: IdentityService;
  idleModalDialogRef: MatDialogRef<any>;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  refreshTokenTimeOut: any;
  onIdleStart: any;
  onIdleEnd: any;

  onIdleTimeout: any;
  @ViewChild('idleModal', {static: true}) idleModal: TemplateRef<any>;

  constructor(public themeService: ThemeService) {
    this.idle = LocatorService.injector.get(Idle);
    this.keepalive = LocatorService.injector.get(Keepalive);
    this.idleModalDialogRef = LocatorService.injector.get(MatDialogRef);
    this.identityService = LocatorService.injector.get(IdentityService);
    this.translation = LocatorService.injector.get(TranslationService);
    this.authenticationService = LocatorService.injector.get(AuthenticationService);
    this.router = LocatorService.injector.get(Router);
    this.dialog = LocatorService.injector.get(MatDialog);
  }

  private idelSubscribe() {
    //this.onIdleEnd = this.idle.onIdleEnd.subscribe(() => {
    //  this.idleState = 'No longer idle.'
    //  console.log(this.idleState);

    //  this.reset();
    //});

    //this.onIdleTimeout = this.idle.onTimeout.subscribe(() => {
    //  this.idleState = this.translate('general.timeEnd');
    //  this.timedOut = true;
    //  /*    console.log(this.idleState);
    //      this.router.navigate(['/']);*/

    // // this.logout()
    //});

    //this.onIdleStart = this.idle.onIdleStart.subscribe(() => {
    //  this.idleState = 'You\'ve gone idle!'
    //  console.log(this.idleState);
    //  var res = this.translate('seconds');
    //  /*this.childModal.show();*/
    //  this.idleModalDialogRef = this.dialog.open(IdleDialogComponent, {
    //    width: '500px',
    //    panelClass: 'my-dialog',
    //    data: {
    //      idleStateTitle: this.translate('general.stateIdle'),
    //      stayTitle: this.translate('general.stay'),
    //      logoutTitle: this.translate('general.logout'),
    //      idleState: this.idleState,
    //      idle: this.idle,
    //      timeOutMessage: this.translate('general.timeout'),
    //      secondsMessage: this.translate('general.seconds')
    //    },
    //  })

    //  this.idleModalDialogRef.componentInstance.onStay.subscribe(result => {
    //    if (result) {
    //      this.stay();
    //    } else {
    //      this.logout();
    //    }
    //  })
    //});


    // sets the ping interval to 15 seconds
    //this.onIdleTimeout = this.keepalive.interval(15);

    //this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    //this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  translate(key: string): string {
    return this.translation.translate(key);
  }

  async idleStart() {
    if ((await this.authenticationService.isLoggedIn() && this.idleState == 'Not started.') || this.idleState == "Timed out!") {
      this.idle.setIdle(environment.idleTimeOut);
      this.idle.setTimeout(environment.idleCounter);
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      this.idleState = 'start';
      this.idelSubscribe()
    }
  }

  logout() {
    this.authenticationService.logout();
    this.idleModalDialogRef.close();
    this.idleUnSubscribe()
    StorageManager.set(StorageKey.AdminUserContext, "");
    this.router.navigate([this.themeService.merchantCode + '/admin', 'login']);
  }

  stay() {
    const userContext = this.authenticationService.getUserContext(ModuleCode.Admin);
    this.identityService.refreshToken(userContext).subscribe(result => {
      if (result) {
        StorageManager.set(StorageKey.AdminUserContext, "");
        result.isRefreshToken = true;
        this.authenticationService.setUserContext(result, ModuleCode.Admin);
        this.refreshTokenIn(result.token);

      }
    })
    this.idleModalDialogRef.close();
    this.reset();
  }

  refreshTokenIn(token) {
    this.authenticationService.getClaim(UserClaimType.Exp, null, token).then(expDate => {
      const refreshExpireDate = (new Date(expDate * 1000).getTime() - 60000) - new Date().getTime();
      console.log(refreshExpireDate)
      this.refreshTokenTimeOut = setTimeout(() => {
        this.stay();
      }, refreshExpireDate)
    })
  }

  idleUnSubscribe() {
    this.onIdleStart.unsubscribe();
    this.onIdleEnd.unsubscribe();
    //this.onIdleTimeout.unsubscribe();
    clearTimeout(this.refreshTokenTimeOut);
  }
}
