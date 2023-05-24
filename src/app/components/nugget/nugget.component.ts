import { Component } from '@angular/core';
import { Nugget } from '../../models';
import { NuggetService } from '../../services';

@Component({
  selector: 'app-nugget',
  templateUrl: './nugget.component.html'
})
export class NuggetComponent {
  nugget?: Nugget;

  constructor(private nuggetService: NuggetService){
  }

  ngOnInit(id: string): void {
    this.getNugget(id);
  }

  getNugget(id: string){
    this.nuggetService.get(id).subscribe(nugget => {
      this.nugget = nugget;
    });
  }
}
