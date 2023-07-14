import {Component, inject} from '@angular/core';
import {AuthenticationService} from "../../services";
import {User} from "../../models";

@Component({
    selector: 'app-user-manager',
    templateUrl: './user-manager.component.html'
})
export class UserManagerComponent {
    authenticationService = inject(AuthenticationService)

    active = 1;
    user?: User | null;
    userIsAdmin = false;

    constructor() {
        this.user = this.authenticationService.GetUserFromToken;
        this.userIsAdmin = this.authenticationService.GetUserFromToken?.isAdmin || false;
    }

}
