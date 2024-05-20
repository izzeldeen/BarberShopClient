import {UserClaimType} from 'src/app/shared/enum/user-claim-type.enum';
import {ModuleCode} from '../../../shared/enum/module-code-enum';
import {UserContext} from './user-context';
import jwt_decode from 'jwt-decode';
import {SystemMenu} from 'src/app/shared/model/system-menu/system-menu.vm';
import {EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {LoginParms} from './login-parms';
import decode from 'jwt-decode';

export abstract class AuthHandler {
  tokenPayload:any;
  userContextChanged = new EventEmitter<UserContext>();
  loginChanged = new BehaviorSubject<boolean>(false);

  constructor(public location: Location) {
  }

  abstract init(module: ModuleCode): void;

  abstract checkAuthentication(): Promise<any>;

  abstract setUserContext(userContext: UserContext, module?: ModuleCode): void;

  abstract getUserContext(module?: ModuleCode): UserContext | undefined;

  abstract removeUserContext(module?: ModuleCode): void;

  abstract getAccessToken(module?: ModuleCode): Promise<string>;

  abstract login(params?: LoginParms, module?: ModuleCode): Promise<any>;

  abstract completeLogin(module?: ModuleCode): Promise<any>;

  abstract logout(module?: ModuleCode): void;

  abstract completeLogout(module?: ModuleCode): Promise<any>;

  getMenus(module?: ModuleCode): SystemMenu[] {
    const userContext = this.getUserContext(module);
    return  undefined;
  }

  async hasRole(roles: string | string[], module?: ModuleCode): Promise<boolean> {
    if (!roles || roles.length == 0) {
      return true;
    }

    const currentRoles: string[] = await this.getClaim(UserClaimType.Role, module) as string[];
    if (!currentRoles) {
      return false;
    }

    let hasRole = false;

    const rolesList: string[] = typeof (roles) == "string" ? [roles] : roles;

    for (const role of currentRoles) {
      if (rolesList.some(r => r.toUpperCase() == role.toUpperCase())) {
        hasRole = true;
        break;
      }
    }

    return hasRole;
  }

  async hasPermission(permissions: string | string[], module?: ModuleCode): Promise<boolean> {
    if (!permissions || permissions.length == 0) {
      return true;
    }

    const currentPermissions: string[] = await this.getClaim(UserClaimType.Permission, module) as string[];
    if (!currentPermissions) {
      return false;
    }

    let hasPermission = false;

    const permissionsList: string[] = typeof (permissions) == "string" ? [permissions] : permissions;

    for (const permission of currentPermissions) {
      if (permissionsList.some(p => p.toUpperCase() == permission.toUpperCase())) {
        hasPermission = true;
        break;
      }
    }

    return hasPermission;
  }

  async getUserId(): Promise<number> {
    return await this.getClaim(UserClaimType.UserId) as number;
  }

  async getStoreId(): Promise<number> {
    return await this.getClaim(UserClaimType.StoreId) as number;
  }


  async getGroupId(): Promise<string> {
    return await this.getClaim(UserClaimType.GroupId) as string;
  }

  async getClaim(claim: UserClaimType, module?: ModuleCode, token?: string): Promise<any> {

    const currentToken = token ? token : await this.getAccessToken(module);
    if (!currentToken) {
      return undefined;
    }

    try {
      const decoded = jwt_decode(currentToken);
      if (decoded) {
        return decoded[claim];
      }
    }
    catch (ex) {
      console.error('invalid jwt token', ex);
    }

    return undefined;
  }

  public getPermissions(){
    this.getAccessToken(ModuleCode.Admin).then(token => {
      if (token) {
        this.tokenPayload = decode(token);
   }
   if(this.tokenPayload?.permissions){
       return this.tokenPayload?.permissions;
   }
   return [];
    })
   
  }

  async isLoggedIn(module?: ModuleCode): Promise<boolean> {
    const accessToken = await this.getAccessToken(module);
    return !!accessToken;
  }

  isAdminUrl(module?: ModuleCode) {
    let isAdmin = false;
    if (module) {
      isAdmin = module && module == ModuleCode.Admin;
    }
    //else {
   //   isAdmin = this.location.path().toLowerCase().indexOf('/admin') > -1;
   // }
    return isAdmin;
  }
}
