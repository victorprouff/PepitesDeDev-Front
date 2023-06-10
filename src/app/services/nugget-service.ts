import {Injectable} from '@angular/core';
import {Nugget} from '../models';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environnements/environnement";
import {GetAllResponse} from "./models/nuggets/getAllResponse";

@Injectable({
    providedIn: 'root'
})
export class NuggetService {
    constructor(private http: HttpClient) {
    }

    create(title: string, content: string) {
        return this.http.post(`${environment.apiUrl}/nugget`, {title, content});
    }

    update(id: string, title: string, content: string) {
        return this.http.put(`${environment.apiUrl}/nugget/${id}`, {
            Title: title,
            Content: content
        });
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/nugget/${id}`);
    }

    get(id: string) {
        return this.http.get<Nugget>(`${environment.apiUrl}/nugget/${id}`);
    }

    getList(limit: number, offset: number) {
        return this.http.get<GetAllResponse>(`${environment.apiUrl}/nugget`,
            {
                params: {
                    limit: limit,
                    offset: offset
                }
            });
    }

    getListByUserId(limit: number, offset: number) {
        return this.http.get<GetAllResponse>(`${environment.apiUrl}/nugget/user`,
            {
                params: {
                    limit: limit,
                    offset: offset
                }
            });
    }
}
