import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NuggetService } from "../../services";
import { first } from "rxjs/operators";
import {RedirectService} from "../../services/redirect.service";

@Component({
  selector: 'app-add-nugget',
  templateUrl: './add-nugget.component.html'
})
export class AddNuggetComponent {
  createNuggetForm!: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private redirect: RedirectService,
      private nuggetService: NuggetService
  ) {
  }

  ngOnInit() {
    this.createNuggetForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  protected readonly onsubmit = onsubmit;

  get f() { return this.createNuggetForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.createNuggetForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;

    this.nuggetService.create(this.f.title.value, this.f.content.value)
        .pipe(first())
        .subscribe({
          next:() => {
            this.redirect.toHome();
          },
          error: error => {
            this.error = error;
            this.loading = false;
          }
        });
  }
}
