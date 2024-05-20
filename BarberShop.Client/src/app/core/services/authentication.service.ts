import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModuleCode } from 'src/app/shared/enum/module-code-enum';
import { AuthHandler } from '../utilities/auth-handlers/auth-handler';
import { JwtAuthHandler } from '../utilities/auth-handlers/jwt-auth-handler';
import { UserClaimType } from 'src/app/shared/enum/user-claim-type.enum';
import { UserContext } from '../utilities/auth-handlers/user-context';
import { Location } from '@angular/common';
import { SystemMenu } from 'src/app/shared/model/system-menu/system-menu.vm';
import { IdentityService } from 'src/app/shared/services/identity.service';
import { BehaviorSubject } from 'rxjs';
import { LoginParms } from '../utilities/auth-handlers/login-parms';

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
    private authHandler: AuthHandler;

    constructor(private location: Location, private identityService: IdentityService) {
        this.authHandler = new JwtAuthHandler(this.location, this.identityService);
    }

    init(module: ModuleCode): void {
        return this.authHandler.init(module);
    }

    setUserContext(user: UserContext, module?: ModuleCode): void {
        return this.authHandler.setUserContext(user, module);
    }

    getUserContext(module?: ModuleCode): UserContext | undefined {
        return this.authHandler.getUserContext(module);
    }

    removeUserContext(module?: ModuleCode): void {
        return this.authHandler.removeUserContext(module);
    }

    getMenus(module?: ModuleCode): SystemMenu[] {
        return this.authHandler.getMenus(module);
    }

    hasRole(roles: string | string[], module?: ModuleCode): Promise<boolean> {
        return this.authHandler.hasRole(roles, module);
    }

    hasPermission(permissions: string | string[], module?: ModuleCode): Promise<boolean> {
        return this.authHandler.hasPermission(permissions, module);
    }

    getUserId(): Promise<number> {
        return this.authHandler.getUserId();
    }

    getStoreId(): Promise<number> {
        return this.authHandler.getStoreId();
    }

    getGroupId(): Promise<string> {
        return this.authHandler.getGroupId();
    }

    getClaim(claim: UserClaimType, module?: ModuleCode, token?: string): Promise<any> {
        return this.authHandler.getClaim(claim, module, token);
    }

    getPermissions(): any {
        return this.authHandler.getPermissions();
    }
    getAccessToken(module?: ModuleCode): Promise<string> {
        return this.authHandler.getAccessToken(module);
    }

    get userContextChanged(): EventEmitter<UserContext> {
        return this.authHandler.userContextChanged;
    }

    get loginChanged(): BehaviorSubject<boolean> {
        return this.authHandler.loginChanged;
    }

    isLoggedIn(module?: ModuleCode): Promise<boolean> {
        return this.authHandler.isLoggedIn(module);
    }

    login(params: LoginParms, module?: ModuleCode): Promise<any> {
        return this.authHandler.login(params, module);
    }

    completeLogin(module?: ModuleCode): Promise<any> {
        return this.authHandler.completeLogin(module);
    }

    logout(module?: ModuleCode): void {
        return this.authHandler.logout(module);
    }

    completeLogout(module?: ModuleCode): Promise<any> {
        return this.authHandler.completeLogout(module);
    }
}