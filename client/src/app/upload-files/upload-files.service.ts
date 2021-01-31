import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {
    constructor(private http: HttpClient) {

    }

    uploadListing(files: any, callback: any) {
       
        const httpOptions = {
            headers: new HttpHeaders({ enctype: "multipart/form-data", Accept: "application/json" })
        };
        return this.http
            .post("http://localhost:3030/upload", files, httpOptions)
            .subscribe(res => callback(res));


    }
}