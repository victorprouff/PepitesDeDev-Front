import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, NuggetService} from "../../services";
import {first} from "rxjs/operators";
import {Nugget} from "../../models";

@Component({
  selector: 'app-update-nugget',
  templateUrl: './update-nugget.component.html'
})
export class UpdateNuggetComponent {
  updateNuggetForm!: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  id = '';
  nugget?: Nugget;

  constructor(
      private formBuilder: FormBuilder,
      private Activatedroute: ActivatedRoute,
      private router: Router,
      private nuggetService: NuggetService,
      private authenticationService: AuthenticationService
  ) {
  }

ngOnInit() {
  this.Activatedroute.paramMap.subscribe(paramMap => {
    this.id = paramMap.get('id') || '';
  });

  this.nuggetService.get(this.id).subscribe(nugget => {
    this.nugget = nugget;

    if (this.authenticationService.userValue?.id != this.nugget?.userId) {
      this.router.navigate(['/']);
    }
  })

  this.updateNuggetForm = this.formBuilder.group({
    title: [this.nugget?.title, [Validators.minLength(5)]],
    content: [this.nugget?.content, [Validators.minLength(5)]]
  });
}

  protected readonly onsubmit = onsubmit;

  get f() { return this.updateNuggetForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.updateNuggetForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;

    this.nuggetService.update(this.id, this.f.title.value, this.f.content.value)
        .pipe(first())
        .subscribe({
          next:() => {
            this.router.navigate(['/']);
          },
          error: error => {
            this.error = error;
            this.loading = false;
          }
        });
  }
}
