import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "./helper";

import { LoginComponent } from "./components/login";
import { NuggetsListComponent } from './components/nuggets-list';
import { AddNuggetComponent } from "./components/add-nugget/add-nugget.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {UpdateNuggetComponent} from "./components/update-nugget/update-nugget.component";
import {UserManagerComponent} from "./components/user-management/user-manager.component";

const routes: Routes = [
  { path: '', component: NuggetsListComponent },
  { path: 'add-nugget', component: AddNuggetComponent, canActivate: [AuthGuard] },
  { path: 'update-nugget/:id', component: UpdateNuggetComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-manager', component: UserManagerComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
