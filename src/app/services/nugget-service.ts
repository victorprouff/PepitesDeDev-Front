import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Nugget } from '../models';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environnements/environnement";

@Injectable({
  providedIn: 'root'
})
export class NuggetService {
  nuggets: Nugget[] = [];

  constructor(private http: HttpClient) {
  }

  create(title: string, content: string){
    return this.http.post(`${environment.apiUrl}/nugget`, { title, content });
  }

  getList(){
    return this.http.get<Nugget[]>(`${environment.apiUrl}/nugget`);
  }

  get(id: Guid){
    return this.http.get<Nugget>(`${environment.apiUrl}/nugget${id}`);
  }
}
