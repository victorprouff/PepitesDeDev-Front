import {Component, OnInit} from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../services";
import {UserService} from "../../services/user.service";
import {RedirectService} from "../../services/redirect.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
  createUserForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private redirect: RedirectService,
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
    if (this.authenticationService.userValue) {
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

  get f() { return this.createUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createUserForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    this.userService.create(this.f.email.value, this.f.username.value, this.f.password.value)
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
