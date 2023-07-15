import {Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService, NuggetService} from "../../services";
import {first} from "rxjs/operators";
import {Nugget} from "../../models";
import {RedirectService} from "../../services/redirect.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-update-nugget',
    templateUrl: './update-nugget.component.html'
})
export class UpdateNuggetComponent implements OnDestroy {
    formBuilder = inject(FormBuilder)
    Activatedroute = inject(ActivatedRoute)
    redirect = inject(RedirectService)
    nuggetService = inject(NuggetService)
    authenticationService = inject(AuthenticationService)

    subscriptions: Subscription[] = []

    updateNuggetForm!: FormGroup;
    submitted = false;
    loading = false;
    data? = '';
    error = '';
    id = '';
    userIsAdmin = false;

    nugget?: Nugget;
    file: File =  new File([], "");

    ngOnInit() {
        this.userIsAdmin = this.authenticationService.GetUserFromToken?.isAdmin || false;

        const subscription1 = this.Activatedroute.paramMap.subscribe(paramMap => {
            this.id = paramMap.get('id') || '';
        });

        this.updateNuggetForm = this.formBuilder.group({
            title: [''],
            content: ['']
        });

        const subscription2 = this.nuggetService.get(this.id).subscribe(nugget => {
            this.nugget = nugget;
            this.data = this.nugget?.content;

            this.updateNuggetForm.get('title')!.setValue(this.nugget.title)
            this.updateNuggetForm.get('content')!.setValue(this.nugget.content)

            if (this.authenticationService.GetUserFromToken?.id != this.nugget?.userId && !this.userIsAdmin) {
                this.redirect.toHome();
            }
        })

        this.subscriptions.push(subscription1)
        this.subscriptions.push(subscription2)
    }

    get f() {
        return this.updateNuggetForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.updateNuggetForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;

        const subscription = this.nuggetService.update(this.id, this.f.title.value, this.f.content.value, this.file)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.redirect.toHome();
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });

        this.subscriptions.push(subscription)
    }

    uploadImage = (file: any) => {
        if (file.length === 0) {
            return;
        }

        this.file = file;
    }

    deleteImage = () => {
        const subscription = this.nuggetService.deleteImage(this.id).subscribe({
            next: () => {
                if(this.nugget != null)
                {
                    this.nugget!.urlImage = null
                }
            }
        })

        this.subscriptions.push(subscription)
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
}
