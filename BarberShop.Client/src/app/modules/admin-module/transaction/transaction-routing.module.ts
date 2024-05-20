import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';
import { TransactionManageComponent } from './transaction-manage/transaction-manage.component';


const AdminEmployeeRoutes: Routes = [
  {
      path: '',
      component: TransactionListComponent,
      //data: { permissions: 'users.users_list' },
      canActivate: [AdminGuard]
  },
  {
    path: 'manage',
    component: TransactionManageComponent,
    //data: { permissions: 'users.users_list' },
    canActivate: [AdminGuard]
} ,
 {
  path: ':id',
  component: TransactionManageComponent,
  //data: { permissions: 'users.users_view' },
  canActivate: [AdminGuard]
} ,
];

@NgModule({
  imports: [RouterModule.forChild(AdminEmployeeRoutes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
