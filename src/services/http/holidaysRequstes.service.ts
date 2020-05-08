import { Injectable } from '@angular/core';
import { RequestSend } from '../requestSend.service';
import { EndpointsEnum } from '../endpointsEnum';
import { RequestHoliday } from 'src/models/request';
import { of } from 'rxjs';
import { TypeHolidayRequest } from 'src/models/type';
import { StatusHolidayRequest } from 'src/models/status';

@Injectable({providedIn:'root'})

export class HolidayRequestsService {
    constructor(private requestSend: RequestSend){
    }

    public getRequestsList(params:any ,mock: boolean){
        const thisApiEndpoint = EndpointsEnum.HOLIDAY_REQUESTS_LIST;
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            const holidayRequests = [ new RequestHoliday(0,'email_test@gmail.com',new Date(),new Date(),'chroba dziecka',new Date(),new Date(), new TypeHolidayRequest(-1,'na żadanie'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(1,'email_test@gmail.com',new Date(),new Date(),'wakacje',new Date(),new Date(),new TypeHolidayRequest(-1,'wypoczynkowy'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(2,'email_test@gmail.com',new Date(),new Date(),'chroba',new Date(),new Date(),new TypeHolidayRequest(-1,'zdrowotny'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(3,'email123@o2.pl',new Date(),new Date(),'sprawy urzędowe',new Date(),new Date(),new TypeHolidayRequest(-1,'na żadanie'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(4,'email123@o2.pl',new Date(),new Date(),'sprawy prywatne',new Date(),new Date(),new TypeHolidayRequest(-1,'na żadanie'),new StatusHolidayRequest(-1,'Odrzucony')),
            new RequestHoliday(5,'email123@o2.pl',new Date(),new Date(),'chroba dziecka',new Date(),new Date(),new TypeHolidayRequest(-1,'na żadanie'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(6,'email123@o2.pl',new Date(),new Date(),'wakacje',new Date(),new Date(),new TypeHolidayRequest(-1,'wypoczynkowy'),new StatusHolidayRequest(-1,'Zaakceptowany')),];
            return of(holidayRequests);
        } else {
            return this.requestSend.getRequest(params,thisApiEndpoint,baseUrl);
        }
    }

    public postHolidayRequest(params:any,body: any, mock: boolean){
        console.log('Bodi:', body);
        const thisApiEndpoint = EndpointsEnum.HOLIDAY_REQUEST_POST;
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            return of(body);
        } else {
            return this.requestSend.postRequest(params,thisApiEndpoint,baseUrl,body);
        }
    }

    public getHolidayRequestsByUserList(params:any ,body: any,mock: boolean){
        const thisApiEndpoint = EndpointsEnum.HOLIDAY_REQUEST_LIST_BY_EMPLOYEE;
        const baseUrl = EndpointsEnum.BASE_URL;
        if(mock){
            const holidayRequests = [ new RequestHoliday(0,body,new Date(),new Date(),'chroba dziecka',new Date(),new Date(), new TypeHolidayRequest(-1,'na żadanie'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(1,body,new Date(),new Date(),'wakacje',new Date(),new Date(),new TypeHolidayRequest(-1,'wypoczynkowy'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(2,body,new Date(),new Date(),'chroba',new Date(),new Date(),new TypeHolidayRequest(-1,'zdrowotny'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(3,body,new Date(),new Date(),'sprawy urzędowe',new Date(),new Date(),new TypeHolidayRequest(-1,'na żadanie'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(4,body,new Date(),new Date(),'sprawy prywatne',new Date(),new Date(),new TypeHolidayRequest(-1,'na żadanie'),new StatusHolidayRequest(-1,'Odrzucony')),
            new RequestHoliday(5,body,new Date(),new Date(),'chroba dziecka',new Date(),new Date(),new TypeHolidayRequest(-1,'na żadanie'),new StatusHolidayRequest(-1,'Zaakceptowany')),
            new RequestHoliday(6,body,new Date(),new Date(),'wakacje',new Date(),new Date(),new TypeHolidayRequest(-1,'wypoczynkowy'),new StatusHolidayRequest(-1,'Zaakceptowany')),];
            return of(holidayRequests);
        } else {
            return this.requestSend.postRequest(params,thisApiEndpoint,baseUrl,body);
        }
    }
}