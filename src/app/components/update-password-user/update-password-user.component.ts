import {Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services";
import {RedirectService} from "../../services/redirect.service";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-update-password-user',
    templateUrl: './update-password-user.component.html'
})
export class UpdatePasswordUserComponent implements OnDestroy {
    authenticationService = inject(AuthenticationService)
    formBuilder = inject(FormBuilder)
    redirect = inject(RedirectService)
    userService = inject(UserService)

    subscriptions: Subscription[] = []

    updatePasswordForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    ngOnInit() {
        this.updatePasswordForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required]
        });
    }

    get f() {
        return this.updatePasswordForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.updatePasswordForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;

        const subscription = this.userService.updatePassword(this.f.oldPassword.value, this.f.newPassword.value)
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
