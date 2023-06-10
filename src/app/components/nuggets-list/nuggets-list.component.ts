import { Component } from '@angular/core';
import { Nugget } from "../../models";
import { AuthenticationService, NuggetService } from "../../services";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RedirectService } from "../../services/redirect.service";

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
      private redirect: RedirectService,
      private authenticationService: AuthenticationService,
      private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.userId = this.authenticationService.userValue?.id || ''

    this.getNuggets(3, 0);
  }

  getNuggets(limit: number, offset: number){
    this.nuggetService.getList(limit, offset).subscribe(result => {
      this.nuggets = result.nuggets;
    })
  }

  update(id: string) {
    this.redirect.toUpdateNugget(id);
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
