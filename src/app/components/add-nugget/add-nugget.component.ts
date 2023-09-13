import {Component, EventEmitter, inject, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NuggetService} from "../../services";
import {first} from "rxjs/operators";
import {RedirectService} from "../../services/redirect.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-add-nugget',
    templateUrl: './add-nugget.component.html'
})
export class AddNuggetComponent implements OnDestroy {
    nuggetService = inject(NuggetService)
    formBuilder = inject(FormBuilder)
    redirect = inject(RedirectService)

    subscriptions: Subscription[] = []

    createNuggetForm!: FormGroup;
    submitted = false;
    loading = false;
    error = '';
    file: File | undefined;

    content = this.getContent()

    @Output() public onUploadFinished = new EventEmitter();

    ngOnInit() {
        this.createNuggetForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: [this.content, Validators.required],
            isEnabled: [false]
        });
    }

    protected readonly onsubmit = onsubmit;

    get f() {
        return this.createNuggetForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.createNuggetForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;

        const subscription = this.nuggetService.create(this.f.title.value, this.f.content.value, this.f.isEnabled.value, this.file as File)
            .pipe(first())
            .subscribe({
                next: (nuggetId) => {
                    this.redirect.toHome();
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });

        this.subscriptions.push(subscription)
    }

    uploadFile(file: any) {
        if (file.length === 0) {
            return;
        }

        this.file = file;
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }

    getContent(){
        return '# Titre\n' +
            '## Code\n' +
            '```sql\n' +
            'SELECT * FROM user WHERE user.id = 1;\n' +
            '```\n' +
            'Langages supportées :\n' +
            '- csharp\n' +
            '- css\n' +
            '- powershell\n' +
            '- bash\n' +
            '- c\n' +
            '- cpp\n' +
            '- cshtml\n' +
            '- scss\n' +
            '- sass\n' +
            '- python\n' +
            '- rust\n' +
            '- ruby\n' +
            '- json\n' +
            '- sql\n' +
            '- javascript\n' +
            '- java\n' +
            '- docker\n' +
            '\n' +
            '*Ce texte est en italique.*\n' +
            '_Celui-ci aussi._\n' +
            '\n' +
            '**Ce texte est en gras.**\n' +
            '__Celui-là aussi.__\n' +
            '\n' +
            '***Ce texte a les deux styles.***\n' +
            '**_Pareil ici_**\n' +
            '*__Et là!__*\n' +
            '\n' +
            '*******\n' +
            '\n' +
            '## Liste\n' +
            '- toto\n' +
            '- tutu\n' +
            '\n' +
            '[Clic moi!](https://www.youtube.com/watch?v=dQw4w9WgXcQ)';
    }
}
