import { Component } from '@angular/core';
import { Nugget } from '../../models';
import {AuthenticationService, NuggetService} from '../../services';
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RedirectService} from "../../services/redirect.service";

@Component({
  selector: 'app-nugget',
  templateUrl: './nugget.component.html'
})
export class NuggetComponent {
  userId: string = '';
  nugget?: Nugget;
  deleteNuggetId = '';

  itemsPerPage = 1;

  totalItemsPages = 0;
  nbPage = 0;
  currentPage = 1;

  constructor(
      private Activatedroute: ActivatedRoute,
      private nuggetService: NuggetService,
      private redirect: RedirectService,
      private authenticationService: AuthenticationService,
      private modalService: NgbModal
  ){
  }

  ngOnInit(): void {
    this.userId = this.authenticationService.userValue?.id || ''

    this.Activatedroute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id') || '';
      this.getNugget(id);
    });
  }

  getNugget(id: string){
    this.nuggetService.get(id).subscribe(nugget => {
      this.nugget = nugget;
    });
  }

  getNuggets() {
    this.nuggetService.getList(this.itemsPerPage, (this.currentPage - 1) * this.itemsPerPage)
        .subscribe(result => {
          this.nugget = result.nuggets[0];
          this.totalItemsPages = result.nbOfNuggets
          this.nbPage = this.getNbOfPage(this.totalItemsPages)
        })
  }

  delete() {
    this.nuggetService.delete(this.deleteNuggetId).subscribe(_ =>
    {
      this.ngOnInit();
    });
  }

  update(id: string) {
    this.redirect.toUpdateNugget(id);
  }

  open(content:any, nuggetId: string) {
    this.deleteNuggetId = nuggetId;

    this.modalService.open(content).result.then();
  }

  previousPage() {
    this.currentPage = this.currentPage == 1 ? 1 : this.currentPage - 1;
    this.getNuggets();
  }

  nextPage() {
    this.currentPage = this.currentPage == this.nbPage ? this.nbPage : this.currentPage + 1;
    this.getNuggets();
  }

  getNbOfPage(nbOfNuggets : number){
    return Math.ceil(nbOfNuggets / this.itemsPerPage);
  }
}
