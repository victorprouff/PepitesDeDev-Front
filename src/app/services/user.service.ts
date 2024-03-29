import {inject, Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {User} from "../models";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)

  getUser(id: string ) {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  create(email: string, username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/user`, { email, username, password });
  }

  updateEmail(email: string) {
    return this.http.put(`${environment.apiUrl}/user/email`, { email });
  }

  updateUsername(username: string) {
    return this.http.put(`${environment.apiUrl}/user/username`, { username });
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return this.http.put(`${environment.apiUrl}/user/password`, { oldPassword, newPassword });
  }
}
