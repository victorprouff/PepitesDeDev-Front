import { Injectable } from '@angular/core';
import {environment} from "../environnements/environnement";
import {User} from "../models";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: string ) {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  create(email: string, username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/user`, { email, username, password });
  }
}
