import {inject, Injectable} from '@angular/core';
import {Nugget} from '../models';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {GetAllResponse} from "./models/nuggets/getAllResponse";

@Injectable({
    providedIn: 'root'
})
export class NuggetService {
    http = inject(HttpClient)

    create(title: string, content: string, files: any | undefined) {
        let formData = new FormData()

        formData.append('Title', title);
        formData.append('Content', content);

        formData = this.appendFileData(formData, files);

        return this.http.post<string>(`${environment.apiUrl}/nugget`, formData);
    }

    update(id: string, title: string, content: string, files: any | undefined) {
        let formData = new FormData()
        formData.append('Id', id);
        formData.append('Title', title);
        formData.append('Content', content);

        formData = this.appendFileData(formData, files);

        return this.http.put(`${environment.apiUrl}/nugget/${id}`, formData);
    }

    private appendFileData(formData: FormData, files: any | undefined){
        if (files != undefined && files.length > 0) {
            const fileToUpload = files[0] as File;
            formData.append('File', fileToUpload, fileToUpload.name);
        }

        return formData;
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/nugget/${id}`);
    }

    deleteImage(id: string) {
        return this.http.delete(`${environment.apiUrl}/nugget/${id}/image`);
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
