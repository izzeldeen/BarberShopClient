import { ModuleCode } from '../../../shared/enum/module-code-enum';
import { StorageManager } from '../storage-manager';
import { AuthHandler } from './auth-handler';
import { UserContext } from './user-context';
import { Location } from '@angular/common';
import { StorageKey } from 'src/app/shared/enum/storage-key-enum';
import { LoginParms } from './login-parms';
import { IdentityService } from 'src/app/shared/services/identity.service';

export class JwtAuthHandler extends AuthHandler {
    constructor(public location: Location, private identityService: IdentityService) {
        super(location);
    }

  init(module?: ModuleCode): void {
    StorageManager.set(StorageKey.Module, module );

  }

    checkAuthentication(): Promise<any> {
        throw new Error('checkAuthentication not implemented.');
    }

    setUserContext(userContext: UserContext, module?: ModuleCode): void {
        const userContextKey = this.getUserContextStorageKey(module);
        StorageManager.set(userContextKey, userContext);
        this.userContextChanged.next(userContext);
    }

    getUserContext(module?: ModuleCode): UserContext | undefined {
        const userContextKey = this.getUserContextStorageKey(module);
        return StorageManager.get(userContextKey);
    }

    removeUserContext(module?: ModuleCode): void {
        const userContextKey = this.getUserContextStorageKey(module);
        StorageManager.remove(userContextKey);
        this.userContextChanged.next(undefined);
    }

    getAccessToken(module?: ModuleCode): Promise<string> {
        const userContext = this.getUserContext(module);
        const accessToken = userContext ? userContext.token : undefined;
        return Promise.resolve(accessToken);
    }

    login(params?: LoginParms, module?: ModuleCode): Promise<any> {
        throw new Error('login not implemented.');
    }

    completeLogin(module?: ModuleCode): Promise<any> {
        throw new Error('completeLogin not implemented.');
    }

    logout(module?: ModuleCode): void {
        debugger
        this.identityService.logout().subscribe();
        this.removeUserContext(module);
    }

    completeLogout(module?: ModuleCode): Promise<any> {
        throw new Error('completeLogout not implemented.');
    }

  getUserContextStorageKey(module?: ModuleCode) {

    let storageKey;
    storageKey = StorageKey.AdminUserContext;
    if (StorageManager.get(StorageKey.Module) == ModuleCode.Admin) {

      }

        return storageKey;
    }
}
