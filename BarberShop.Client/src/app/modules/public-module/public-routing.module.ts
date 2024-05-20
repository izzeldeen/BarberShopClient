import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {LoginComponent} from "./login/login.component";
import { VerifiedErrorComponent } from './verified-error/verified-error.component';
import { VerifiedSuccessComponent } from './verified-success/verified-success.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const AdministratorRoutes: Routes = [
    {
        path: 'sign-in',
        component: LoginComponent
    },
    {
        path: 'verified-error',
        component: VerifiedErrorComponent
    }, 
    {
        path: 'verified-success',
        component: VerifiedSuccessComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    
    {
        path:'reset-password',
        component:ResetPasswordComponent
    },
    {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(AdministratorRoutes)],
    exports: [RouterModule]
})
export class PublicAdminRoutingModule {
}
