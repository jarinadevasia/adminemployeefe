import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[authGuardGuard]},
  {path:'employees',component:EmployeeListComponent},
  {path:'employee/add',component:EmployeeAddComponent},
  {path:'employee/edit/:id',component:EmployeeEditComponent},
  {path:'**',component:NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
