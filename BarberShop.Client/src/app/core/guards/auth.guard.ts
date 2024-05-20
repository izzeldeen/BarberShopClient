import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {StorageManager} from '../utilities/storage-manager';
import {StorageKey} from "../../shared/enum/storage-key-enum";
import {ModuleCode} from "../../shared/enum/module-code-enum";



@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService : AuthenticationService
    ) {
    }

   /* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const expectedRole = route.data.role;
        if (this.authenticationService.getToken()) {
            if (expectedRole == this.authenticationService.user.userTypeId) {
                return true;
            } else {
                //unthrized page
                this.router.navigate(['/authorization/sign-in']);
                return false;
            }

        } else {
            this.router.navigate(['/authorization/sign-in']);
            return false;
        }

    }*/


    canLoad(route: Route): Promise<boolean> {
        return this.checkPermissions(route.data.permissions);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        StorageManager.set(StorageKey.AdminRedirectUrl, route['_routerState'].url);
        return this.checkPermissions(route.data.permissions);
    }

    private async checkPermissions(permissions: string | string[]): Promise<boolean> {
        // if (await this.authenticationService.hasPermission(permissions, ModuleCode.Admin)) {
        //     return true;
        // }
        // const isLoggedIn = await this.authenticationService.isLoggedIn(ModuleCode.Admin);
        // if (isLoggedIn) {
        //     this.router.navigate(['/authorization/sign-in'])
        // } else {
        //     this.router.navigate(['/authorization/sign-in']);
        // }
        //return false;
        return true;

    }
}
