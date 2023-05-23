import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "./helper";

import { LoginComponent } from "./login";
import { HomeComponent } from './home';
import { NuggetsListComponent } from './nuggets-list';
import { AddNuggetComponent } from "./add-nugget/add-nugget.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {UpdateNuggetComponent} from "./update-nugget/update-nugget.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list-nuggets', component: NuggetsListComponent },
  { path: 'add-nugget', component: AddNuggetComponent, canActivate: [AuthGuard] },
  { path: 'update-nugget/:id', component: UpdateNuggetComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
