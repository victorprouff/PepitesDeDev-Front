import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { NuggetsListComponent } from './nuggets-list';
import { LoginComponent } from "./login";
import {AuthGuard} from "./helper";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list-nuggets', component: NuggetsListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
