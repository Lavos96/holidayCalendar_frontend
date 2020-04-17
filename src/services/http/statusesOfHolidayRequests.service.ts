import { Injectable } from '@angular/core';
import { RequestSend } from '../requestSend.service';
import { EndpointsEnum } from '../endpointsEnum';
import { of } from 'rxjs';
import { StatusHolidayRequest } from 'src/models/status';

@Injectable({providedIn:'root'})

export class StatusesOfHolidaysRequestsService {
    constructor(private requestSend: RequestSend){
    }

    public getStatusesList(params:any ,mock: boolean){
        const thisApiEndpoint = EndpointsEnum.STATUSES_LIST;
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            const statusesOfHolidaysRequests = [ new StatusHolidayRequest(-1,'Planowane'),
            new StatusHolidayRequest(-1,'Zaakceptowane'),
            new StatusHolidayRequest(-1,'Zgłoszone'),
            new StatusHolidayRequest(-1,'Odrzucone'),];
            return of(statusesOfHolidaysRequests);
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }
}