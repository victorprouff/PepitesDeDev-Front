import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtInterceptor, ErrorInterceptor } from './helper';

import { NuggetsListComponent } from './nuggets-list';
import { NuggetComponent } from './nugget/nugget.component';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { AddNuggetComponent } from './add-nugget/add-nugget.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateNuggetComponent } from './update-nugget/update-nugget.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NuggetsListComponent,
    NuggetComponent,
    LoginComponent,
    HomeComponent,
    AddNuggetComponent,
    AddUserComponent,
    UpdateNuggetComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
