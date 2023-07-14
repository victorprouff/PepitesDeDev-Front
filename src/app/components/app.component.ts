import {Component, inject} from '@angular/core';
import {AuthenticationService} from "../services";
import {User} from "../models";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    authenticationService = inject(AuthenticationService)

    user?: User | null;

    constructor() {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.authenticationService.logout();
    }
}
