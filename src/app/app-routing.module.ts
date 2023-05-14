import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuggetsListComponent } from './nuggets-list';
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: '', component: NuggetsListComponent },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
