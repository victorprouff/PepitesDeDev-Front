import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services";
import {RedirectService} from "../../services/redirect.service";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-update-username-user',
    templateUrl: './update-username-user.component.html'
})
export class UpdateUsernameUserComponent {
    formBuilder = inject(FormBuilder)
    authenticationService = inject(AuthenticationService)
    redirect = inject(RedirectService)
    userService = inject(UserService)

    updateUsernameForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    ngOnInit() {
        this.updateUsernameForm = this.formBuilder.group({
            username: ['', Validators.required]
        });
    }

    get f() {
        return this.updateUsernameForm.controls;
    }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.updateUsernameForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;
        this.userService.updateUsername(this.f.username.value)
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
    }
}
