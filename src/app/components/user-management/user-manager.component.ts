import {Component} from '@angular/core';
import {AuthenticationService} from "../../services";
import {User} from "../../models";

@Component({
    selector: 'app-user-manager',
    templateUrl: './user-manager.component.html'
})
export class UserManagerComponent {
    active = 1;
    user?: User | null;

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        this.user = this.authenticationService.userValue;
    }

}
