import {Injectable} from '@angular/core';
import {Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CanLoad} from '@angular/router';
import {ModuleCode} from '../../shared/enum/module-code-enum';
import {StorageManager} from 'src/app/core/utilities/storage-manager';
import {StorageKey} from '../../shared/enum/storage-key-enum';
import {AuthenticationService} from '../services/authentication.service';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AdminGuard implements CanLoad {
    constructor(private router: Router, private toaster: ToastrService,
                private authenticationService: AuthenticationService) {
        this.authenticationService.init(ModuleCode.Admin);
    }

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

        // // if permission not granted
        // const isLoggedIn = await this.authenticationService.isLoggedIn(ModuleCode.Admin);
        // if (isLoggedIn) {
        //     this.router.navigate(['admin/unauthorize']);
        // } else {
        //     this.toaster.error("please login", "Unauthorized access");
        //     //this.router.navigate([this.themeService.merchantCode + '/admin/login']);
        //     this.router.navigate(['admin/login']);
        // }
        // return false;

        return true;
    }
}
