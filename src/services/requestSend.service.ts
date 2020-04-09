import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})
export class RequestSend {
    constructor(private http: HttpClient){
    }

    public getRequest(params:any,thisApiID:string,basePath:string){
        const url = basePath+thisApiID;
        if(params!==null){
        return this.http.get<any>(url,{observe: 'response', headers: params.headers, params: params.queryParams});
        } else {
            return this.http.get<any>(url);
        }
    }
}