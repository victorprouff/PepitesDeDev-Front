import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from "../../services";
import {RedirectService} from "../../services/redirect.service";
import {Subscription} from "rxjs";

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit, OnDestroy{
    formBuilder = inject(FormBuilder)
    redirect = inject(RedirectService)
    authenticationService = inject(AuthenticationService)

    subscriptions: Subscription[] = []

    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor() {
        // redirect to home if already logged in
        if (this.authenticationService.GetUserFromToken) {
            this.redirect.toHome();
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            emailOrUsername: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;
        const subscription = this.authenticationService.login(this.f.emailOrUsername.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.redirect.toHome();
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
}
