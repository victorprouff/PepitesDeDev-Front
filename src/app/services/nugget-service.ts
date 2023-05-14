import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Nugget } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NuggetService {
  nuggets: Nugget[] = [];

  constructor() {
    this.initNuggetsList();
  }

  getList(){
    return this.nuggets;
  }

  get(id: Guid){
    return this.nuggets.find(n => n.id == id);
  }

  initNuggetsList(){
    this.nuggets = [
      new Nugget(Guid.create(), "Title1", "Laboris consequat aliquip consectetur mollit ipsum fugiat ullamco."),
      new Nugget(Guid.create(), "Title1", "Laboris consequat aliquip consectetur mollit ipsum fugiat ullamco."),
      new Nugget(Guid.create(), "Title1", "Laboris consequat aliquip consectetur mollit ipsum fugiat ullamco.")
    ];
  }
}
