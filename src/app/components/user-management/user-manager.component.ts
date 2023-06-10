import {Component} from '@angular/core';
import {Nugget} from "../../models";
import {AuthenticationService, NuggetService} from "../../services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RedirectService} from "../../services/redirect.service";

@Component({
    selector: 'app-user-manager',
    templateUrl: './user-manager.component.html'
})
export class UserManagerComponent {
    nuggets: Nugget[] = [];
    userId = '';
    deleteNuggetId = '';

    itemsPerPage = 2;

    totalItemsPages = 0;
    nbPage = 0;
    currentPage = 0;

    constructor(
        private nuggetService: NuggetService,
        private redirect: RedirectService,
        private authenticationService: AuthenticationService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.userId = this.authenticationService.userValue?.id || ''

        this.getNuggets(this.itemsPerPage, 0);
    }

    getNuggets(limit: number, offset: number) {
        this.nuggetService.getListByUserId(limit, offset)
            .subscribe(result => {
                this.nuggets = result.nuggets;
                this.totalItemsPages = result.nbOfNuggets
                this.nbPage = this.getNbOfPage(this.totalItemsPages)
            })
    }

    previousPage() {
        this.getNuggets(this.itemsPerPage, this.currentPage * this.itemsPerPage);
        this.currentPage = this.currentPage - 1;
    }

    nextPage() {
        this.getNuggets(this.itemsPerPage, this.currentPage * this.itemsPerPage);
        this.currentPage = this.currentPage + 1;
    }

    update(id: string) {
        this.redirect.toUpdateNugget(id);
    }

    delete() {
        this.nuggetService.delete(this.deleteNuggetId).subscribe(_ => {
            this.ngOnInit();
        });
    }

    open(content: any, nuggetId: string) {
        this.deleteNuggetId = nuggetId;

        this.modalService.open(content).result.then();
    }

    getNbOfPage(nbOfNuggets : number){
        return Math.ceil(nbOfNuggets / this.itemsPerPage);
    }
}
