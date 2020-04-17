import { TypeHolidayRequest } from './type';
import { StatusHolidayRequest } from './status';

export class RequestHoliday{
    id:number;
    employee:string;
    startDate:Date;
    endDate:Date;
    reason:string;
    requested:Date;
    lastChange:Date;
    type: TypeHolidayRequest;
    status: StatusHolidayRequest;

    constructor(id,employee,startDate,endDate,reason,requested,lastChange,type,status){
        this.id = id;
        this.employee = employee;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.requested = requested;
        this.lastChange = lastChange;
        this.type = type;
        this.status = status;
    }
}