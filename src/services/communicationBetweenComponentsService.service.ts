import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestHoliday } from 'src/models/request';

@Injectable({providedIn:'root'})
export class CommunicationBetweenComponentsService {

    requestToEditBehSubject: BehaviorSubject<RequestHoliday> = new BehaviorSubject(null);
    requestToPrintBehSubject: BehaviorSubject<RequestHoliday> = new BehaviorSubject(null);

    constructor(){  }

}