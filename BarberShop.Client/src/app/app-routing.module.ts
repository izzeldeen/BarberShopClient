import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layouts/layout.component';
import {AuthGuard} from './core/guards/auth.guard';
import {UserType} from "./core/enums/user-type";

const routes: Routes = [
    {
        path: 'admin',
        component: LayoutComponent,
        loadChildren: () => import('./modules/admin-module/admin-module.module').then(m => m.AdminModuleModule),
        // canActivate: [AuthGuard]
    },
    {
        path: 'authorization',
        loadChildren: () => import('./modules/public-module/public-module.module').then(m => m.PublicModuleModule)
    },
    {
        path: '',
        redirectTo: 'authorization',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'authorization',
        pathMatch: 'full'
    },
    {
        path: '404',
        redirectTo: 'authorization',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top' , useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
