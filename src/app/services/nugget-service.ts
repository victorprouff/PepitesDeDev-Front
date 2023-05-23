import { Injectable } from '@angular/core';
import { Nugget } from '../models';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environnements/environnement";

@Injectable({
  providedIn: 'root'
})
export class NuggetService {
  constructor(private http: HttpClient) {
  }

  create(title: string, content: string){
    return this.http.post(`${environment.apiUrl}/nugget`, { title, content });
  }

update(id: string, title: string, content: string){
    return this.http.put(`${environment.apiUrl}/nugget/${id}`, {
          Title: title,
          Content: content
        });
  }

    delete(id: string){
        return this.http.delete(`${environment.apiUrl}/nugget/${id}`);
    }

  getList(){
    return this.http.get<Nugget[]>(`${environment.apiUrl}/nugget`);
  }

  get(id: string){
    return this.http.get<Nugget>(`${environment.apiUrl}/nugget/${id}`);
  }
}
