import { Component } from '@angular/core';
import { Nugget } from "../models";
import {AuthenticationService, NuggetService} from "../services";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-nuggets-list',
  templateUrl: './nuggets-list.component.html'
})
export class NuggetsListComponent {
  nuggets: Nugget[] = [];
  userId: string = '';
  deleteNuggetId = '';

  constructor(
      private nuggetService: NuggetService,
      private router: Router,
      private authenticationService: AuthenticationService,
      private modalService: NgbModal
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

  delete() {
    this.nuggetService.delete(this.deleteNuggetId).subscribe(_ =>
    {
      this.ngOnInit();
    });
  }

  open(content:any, nuggetId: string) {
    this.deleteNuggetId = nuggetId;

    this.modalService.open(content).result.then();
  }
}
