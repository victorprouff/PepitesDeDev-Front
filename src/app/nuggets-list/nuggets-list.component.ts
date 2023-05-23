import { Component } from '@angular/core';
import { Nugget } from "../models";
import {AuthenticationService, NuggetService} from "../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuggets-list',
  templateUrl: './nuggets-list.component.html'
})
export class NuggetsListComponent {
  nuggets: Nugget[] = [];
  userId: string = '';

  constructor(
      private nuggetService: NuggetService,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userId = this.authenticationService.userValue?.id || ''

    this.getNuggets();
  }

  getNuggets(){
    this.nuggetService.getList().subscribe(nuggets => {
      this.nuggets = nuggets;
    })
  }

  update(id: string) {
    this.router.navigate(['update-nugget', id]);
  }
}
