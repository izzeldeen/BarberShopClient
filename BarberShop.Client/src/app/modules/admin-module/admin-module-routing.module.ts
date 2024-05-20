import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../core/guards/auth.guard";
import {UserType} from "../../core/enums/user-type";
import {AdminGuard} from "../../core/guards/admin.guard";


const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        data: {
            role: UserType.ParticipantAdmin
        }
    },
    {
        path: 'service',
        loadChildren: () => import('./service/service.module').then(m => m.ServiceModule),
        canActivate: [AuthGuard],
        data: {
            role: UserType.ParticipantAdmin
        }
    },
    {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
        canActivate: [AuthGuard],
        data: {
            role: UserType.ParticipantAdmin
        }
    },
    {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule),
        canActivate: [AuthGuard],
        data: {
            role: UserType.ParticipantAdmin
        }
    },
    {
        path: 'transaction',
        loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
        canActivate: [AuthGuard],
        data: {
            role: UserType.ParticipantAdmin
        }
    },
    {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class AdminModuleRoutingModule {
}
