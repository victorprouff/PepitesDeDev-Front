import {Component, inject, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../services";
import {User} from "../models";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
    authenticationService = inject(AuthenticationService)

    subscriptions: Subscription[] = []

    user?: User | null;

    constructor() {
        const subscription = this.authenticationService.user.subscribe(x => this.user = x);

        this.subscriptions.push(subscription)
    }

    logout() {
        this.authenticationService.logout();
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
}
