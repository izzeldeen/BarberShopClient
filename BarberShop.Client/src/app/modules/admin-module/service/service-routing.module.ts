import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from './service-list/service-list.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';
import { ServiceManageComponent } from './service-manage/service-manage.component';

const AdminServiceRoutes: Routes = [
  {
      path: '',
      component: ServiceListComponent,
      //data: { permissions: 'users.users_list' },
      canActivate: [AdminGuard]
  },
  {
      path: 'manage',
      component: ServiceManageComponent,
      //data: { permissions: 'users.users_view' },
      canActivate: [AdminGuard]
  } ,
  {
      path: ':id',
      component: ServiceManageComponent,
      //data: { permissions: 'users.users_view' },
      canActivate: [AdminGuard]
  } ,
 
];

@NgModule({
  imports: [RouterModule.forChild(AdminServiceRoutes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
