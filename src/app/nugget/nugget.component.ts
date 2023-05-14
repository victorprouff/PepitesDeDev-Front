import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Nugget } from '../models';
import { NuggetService } from '../services/nugget-service';

@Component({
  selector: 'app-nugget',
  templateUrl: './nugget.component.html'
})
export class NuggetComponent {
  nugget: Nugget | undefined;

  constructor(private nuggetService: NuggetService){
  }

  ngOnInit(id: Guid): void {
    this.getNugget(id);
  }

  getNugget(id: Guid){
    this.nugget = this.nuggetService.get(id);
  }
}
