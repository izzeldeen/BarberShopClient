import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAssignServiceComponent } from './employee-assign-service/employee-assign-service.component';

const AdminEmployeeRoutes: Routes = [
  {
      path: '',
      component: EmployeeListComponent,
      //data: { permissions: 'users.users_list' },
      canActivate: [AdminGuard]
  },
  {
    path: 'assign-service/:id',
    component: EmployeeAssignServiceComponent,
    //data: { permissions: 'users.users_list' },
    canActivate: [AdminGuard]
  },
  {
      path: 'manage',
      component: EmployeeManageComponent,
      //data: { permissions: 'users.users_view' },
      canActivate: [AdminGuard]
  } ,
  // {
  //     path: ':id',
  //     component: EmployeeDetailsComponent,
  //     //data: { permissions: 'users.users_view' },
  //     canActivate: [AdminGuard]
  // } ,
 
];

@NgModule({
  imports: [RouterModule.forChild(AdminEmployeeRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
