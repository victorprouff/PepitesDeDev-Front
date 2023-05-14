import { Injectable } from '@angular/core';
import {environment} from "../environnements/environnement";
import {User} from "../models";
import {HttpClient} from "@angular/common/http";
import {Guid} from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: Guid ) {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }}
