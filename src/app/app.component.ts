import { Component } from '@angular/core';
import {AuthenticationService} from "./services";
import {User} from "./models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'pepite-du-code-front';
  user?: User | null;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authenticationService.logout();
  }
}
