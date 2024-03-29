import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../services";
import {UserService} from "../../services/user.service";
import {RedirectService} from "../../services/redirect.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit, OnDestroy {
    formBuilder = inject(FormBuilder)
    redirect = inject(RedirectService)
    authenticationService = inject(AuthenticationService)
    userService = inject(UserService)

    subscriptions: Subscription[] = []

    createUserForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
    emailRegex = /^[^@\s]+@[^@\s]+\.[a-zA-Z]+$/

    constructor() {
        if (this.authenticationService.GetUserFromToken) {
            this.redirect.toHome();
        }
    }

    ngOnInit() {
        this.createUserForm = this.formBuilder.group({
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() {
        return this.createUserForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.createUserForm.invalid) {
            console.log("Form invalid")
            return;
        }

        this.error = '';
        this.loading = true;
        const subscription = this.userService.create(this.f.email.value, this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.redirect.toHome()
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });

        this.subscriptions.push(subscription)
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
}
