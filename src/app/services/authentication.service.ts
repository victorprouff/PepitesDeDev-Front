import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from "../environments/environment";
import {User} from "../models";
import {RedirectService} from "./redirect.service";


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    redirect = inject(RedirectService)
    http = inject(HttpClient)

    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor() {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get GetUserFromToken() {
        return this.userSubject.value;
    }

    login(emailOrUsername: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/user/authenticate`, {emailOrUsername, password})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.redirect.toHome();
    }
}