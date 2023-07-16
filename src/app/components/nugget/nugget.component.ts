import {Component, inject, OnDestroy} from '@angular/core';
import {Nugget} from '../../models';
import {AuthenticationService, NuggetService} from '../../services';
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RedirectService} from "../../services/redirect.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-nugget',
    templateUrl: './nugget.component.html'
})
export class NuggetComponent implements OnDestroy{
    Activatedroute = inject(ActivatedRoute)
    nuggetService = inject(NuggetService)
    redirect = inject(RedirectService)
    authenticationService = inject(AuthenticationService)
    modalService = inject(NgbModal)

    subscriptions: Subscription[] = []

    userId: string = '';
    userIsAdmin = false;

    nugget: Nugget | undefined;
    deleteNuggetId = '';
    itemsPerPage = 1;

    totalItemsPages = 0;
    nbPage = 0;
    currentPage = 1;

    ngOnInit(): void {
        console.log("app-nugget")
        this.userId = this.authenticationService.GetUserFromToken?.id || ''
        this.userIsAdmin = this.authenticationService.GetUserFromToken?.isAdmin || false;

        const subscription = this.Activatedroute.paramMap.subscribe(paramMap => {
            const id = paramMap.get('id') || '';
            this.getNugget(id);
        });

        this.subscriptions.push(subscription)
    }

    getNugget(id: string) {
        const subscription = this.nuggetService.get(id)
            .subscribe(nugget => {
                    this.nugget = nugget;
                },
                error => {
                    this.redirect.toHome()
                });

        this.subscriptions.push(subscription)
    }

    getNuggets() {
        const subscription = this.nuggetService.getList(this.itemsPerPage, (this.currentPage - 1) * this.itemsPerPage)
            .subscribe(
                (result) => {
                    this.nugget = result.nuggets.map((n) => new Nugget(n.id, n.userId, n.title, n.content, n.urlImage, n.creator, n.createdAt))[0];
                    this.totalItemsPages = result.nbOfNuggets
                    this.nbPage = this.getNbOfPage(this.totalItemsPages)
                });

        this.subscriptions.push(subscription)
    }

    delete() {
        const subscription = this.nuggetService.delete(this.deleteNuggetId)
            .subscribe(_ => this.ngOnInit());

        this.subscriptions.push(subscription)
    }

    update(id: string) {
        this.redirect.toUpdateNugget(id);
    }

    open(content: any, nuggetId: string) {
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

    getNbOfPage(nbOfNuggets: number) {
        return Math.ceil(nbOfNuggets / this.itemsPerPage);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
}
