import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services";
import {RedirectService} from "../../services/redirect.service";
import {first} from "rxjs/operators";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-update-email-user',
    templateUrl: './update-email-user.component.html'
})
export class UpdateEmailUserComponent {
    formBuilder = inject(FormBuilder)
    authenticationService = inject(AuthenticationService)
    redirect = inject(RedirectService)
    userService = inject(UserService)

    updateEmailForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    ngOnInit() {
        this.updateEmailForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
    }

    get f() {
        return this.updateEmailForm.controls;
    }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.updateEmailForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;
        this.userService.updateEmail(this.f.email.value)
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
