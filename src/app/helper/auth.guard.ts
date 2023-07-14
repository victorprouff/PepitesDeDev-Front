import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../services";
import {RedirectService} from "../services/redirect.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    redirect = inject(RedirectService)
    authenticationService = inject(AuthenticationService)

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.GetUserFromToken;
        if (user) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.redirect.toLogin(state.url);
        return false;
    }
}
