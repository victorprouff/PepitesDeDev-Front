import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(files: any){
    if (files.length === 0) {
      return;
    }
    console.log("service", files)
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:5001/api/image', formData, {reportProgress: true, observe: 'events'})
        .subscribe({
          error: (err: HttpErrorResponse) => console.log(err)
        });
  }
}
