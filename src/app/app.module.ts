import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtInterceptor, ErrorInterceptor } from './helper';

import { NuggetsListComponent } from './components/nuggets-list';
import { NuggetComponent } from './components/nugget/nugget.component';
import { LoginComponent } from './components/login';
import { AddNuggetComponent } from './components/add-nugget/add-nugget.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateNuggetComponent } from './components/update-nugget/update-nugget.component';
import { UserManagerComponent } from './components/user-management/user-manager.component';
import {ClipboardButtonComponent, ClipboardOptions, MarkdownModule} from "ngx-markdown";
import {NgOptimizedImage} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import { ListNuggetUserComponent } from './components/list-nugget-user/list-nugget-user.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        MarkdownModule.forRoot({
            clipboardOptions: {
                provide: ClipboardOptions,
                useValue: {
                    buttonComponent: ClipboardButtonComponent,
                },
            }
        }),
        NgOptimizedImage,
        MatIconModule
    ],
  declarations: [
    AppComponent,
    NuggetsListComponent,
    NuggetComponent,
    LoginComponent,
    AddNuggetComponent,
    AddUserComponent,
    UpdateNuggetComponent,
    UserManagerComponent,
    ListNuggetUserComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
