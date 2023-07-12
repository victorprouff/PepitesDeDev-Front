import {Injectable} from '@angular/core';
import {Nugget} from '../models';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../environments/environment";
import {GetAllResponse} from "./models/nuggets/getAllResponse";

@Injectable({
    providedIn: 'root'
})
export class NuggetService {
    constructor(private http: HttpClient) {
    }

    create(title: string, content: string) {
        return this.http.post<string>(`${environment.apiUrl}/nugget`, {title, content});
    }

    update(id: string, title: string, content: string) {
        return this.http.put(`${environment.apiUrl}/nugget/${id}`, {
            Title: title,
            Content: content
        });
    }

    uploadNuggetFile(files: any, nuggetId: string){
        if (files.length === 0) {
            return;
        }

        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        this.http.put(`${environment.apiUrl}/nugget/${nuggetId}/image`, formData)
            .subscribe({
                error: (err: HttpErrorResponse) => console.log(err)
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
