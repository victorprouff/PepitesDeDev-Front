import { Component } from '@angular/core';
import {User} from "../models";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  user?: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    // this.user = Object.assign(new User(), localStorage.getItem('user'));
    const user = this.authenticationService.userValue;
    if (user) {
      this.user = user;
    }
  }
}