import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Nugget } from '../models';
import { NuggetService } from '../services';

@Component({
  selector: 'app-nugget',
  templateUrl: './nugget.component.html'
})
export class NuggetComponent {
  nugget?: Nugget;

  constructor(private nuggetService: NuggetService){
  }

  ngOnInit(id: Guid): void {
    this.getNugget(id);
  }

  getNugget(id: Guid){
    this.nuggetService.get(id).subscribe(nugget => {
      this.nugget = nugget;
    });
  }
}
