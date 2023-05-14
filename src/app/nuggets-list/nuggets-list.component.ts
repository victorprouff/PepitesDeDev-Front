import { Component } from '@angular/core';
import { Nugget } from "../models";
import { NuggetService } from "../services";

@Component({
  selector: 'app-nuggets-list',
  templateUrl: './nuggets-list.component.html'
})
export class NuggetsListComponent {
  nuggets: Nugget[] = [];
  constructor(private nuggetService: NuggetService) { }

  ngOnInit() {
    this.getNuggets();
  }

  getNuggets(){
    this.nuggetService.getList().subscribe(nuggets => {
      this.nuggets = nuggets;
    })
  }
}
