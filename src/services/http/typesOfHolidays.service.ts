import { Injectable } from '@angular/core';
import { RequestSend } from '../requestSend.service';
import { EndpointsEnum } from '../endpointsEnum';
import { of } from 'rxjs';
import { TypeHolidayRequest } from 'src/models/type';

@Injectable({providedIn:'root'})

export class TypesOfHolidaysService {
    constructor(private requestSend: RequestSend){
    }

    public getTypesList(params:any ,mock: boolean){
        const thisApiEndpoint = EndpointsEnum.TYPES_LIST;
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            const typesOfHolidaysRequests = [ new TypeHolidayRequest(-1,'zdrowotny'),
            new TypeHolidayRequest(-1,'wypoczynkowy'),
            new TypeHolidayRequest(-1,'na żądanie')];
            return of(typesOfHolidaysRequests);
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }
}