import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { TypesOfHolidaysService } from 'src/services/http/typesOfHolidays.service';
import * as moment from 'moment';
import { HolidayRequestsService } from 'src/services/http/holidaysRequstes.service';
import { KeyCloakUserInfo } from 'src/services/keyCloakUserInfo.service';
import { StatusHolidayRequest } from 'src/models/status';
import { StatusesOfHolidaysRequestsService } from 'src/services/http/statusesOfHolidayRequests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-holidays-request',
  templateUrl: './create-holidays-request.component.html',
  styleUrls: ['./create-holidays-request.component.sass']
})
export class CreateHolidaysRequestComponent implements OnInit {

  holidayTypes: string[];
  holidayRequestStatuses: string[];
  statuses: StatusHolidayRequest[];

  holidayRequestForm = new FormGroup({
    startDate: new FormControl(moment(), [Validators.required, this.isValidDate(), this.isNotWeekend(), this.isStartDateBeforeEndDate()]),
    endDate: new FormControl(moment(), [Validators.required, this.isValidDate(), this.isNotWeekend(), this.isEndDateAfterStartDate()]),
    reason: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  constructor(private typesOfHolidaysRequest: TypesOfHolidaysService,
    private statusesOfHolidayRequest: StatusesOfHolidaysRequestsService,
    private holidayRequestService: HolidayRequestsService,
    private keyCloakUserInfo: KeyCloakUserInfo,
    private router: Router) { }

  ngOnInit(): void {
    this.typesOfHolidaysRequest.getTypesList(null, false).subscribe((types) => {
      this.holidayTypes = types;
    });
    this.statusesOfHolidayRequest.getStatusesList(null,false).subscribe((statuses)=>{
      this.statuses = statuses;
    })
    this.holidayRequestService.getHolidayRequestsByUserList(null,{email:'email_test@gmail.com'},false).subscribe((requests)=>{
      console.log('Requestu usera email_test@gmail.com :', requests );
    })
  }

  onSubmit(){
    const requestesStatus = this.statuses.find(status=> status.id===1);
    console.log('!!!', this.keyCloakUserInfo.keyCloakUserProfile);
    console.log('TYP', this.holidayRequestForm.get('type').value.id);
    const holidayReq = {id:0,
      employee: this.keyCloakUserInfo.keyCloakUserProfile.email,
      startDate: this.holidayRequestForm.get('startDate').value.add(2,'hour').toISOString(),
      endDate: this.holidayRequestForm.get('endDate').value.add(2,'hour').toISOString(),
      reason: this.holidayRequestForm.get('reason').value,
      requested: moment().add(2,'hour').toISOString(),
      lastChange: moment().add(2,'hour').toISOString(),
      typeId: this.holidayRequestForm.get('type').value.id,
      statusId: requestesStatus.id};
    console.log('holidayReq: ', holidayReq)
    this.holidayRequestService.postHolidayRequest(null,holidayReq,false).subscribe((holidayRequest)=>{
      console.log('Sended', holidayRequest);
      this.router.navigateByUrl('');
    })
  }

  isValidDate(format = "MM.dd.YYYY"): any {
    return (control: FormControl): { [key: string]: any } => {
      const val = moment(control.value, format, true);
      if (!val.isValid()) {
        return {'notValidDate': true};
      }
  
      return null;
    };
  }

  isNotWeekend(format = "MM.dd.YYYY"): any {
    return (control: FormControl): { [key: string]: any } => {
      const val = moment(control.value, format, true);
  
      if ((val.day() !== 0) && (val.day() !== 6)) {
        return null
      } else {
        return {'weekendError': true}
      }

    };
  }

  isStartDateBeforeEndDate(format = "MM.dd.YYYY"): any {
    return (control: FormControl): { [key: string]: any } => {
      const val = moment(control.value, format, true);
      if (this.holidayRequestForm) {
        if (val.isBefore(moment(this.holidayRequestForm.get('endDate').value))) {
          return null
        } else {
          return { 'startDateIsNotBeforeEndDate': true }
        }
      }
      return null;
    };
  }

  isEndDateAfterStartDate(format = "MM.dd.YYYY"): any {
    return (control: FormControl): { [key: string]: any } => {
      const val = moment(control.value, format, true);
      if (this.holidayRequestForm) {
        if (val.isAfter(moment(this.holidayRequestForm.get('startDate').value))) {
          return null
        } else {
          return { 'endDateIsNotAfterStartDate': true }
        }
      }
      return null;
    };
  }


  dateFilter: (date: moment.Moment | null) => boolean =
    (date: moment.Moment | null) => {
      const day = date.day();
      return ((day !== 0) && (day !== 6) && (date.isSameOrAfter(moment().add(-1,'days'))));
      //0 means sunday
      //6 means saturday
  }

  endDateFilter: (date: moment.Moment | null) => boolean =
    (date: moment.Moment | null) => {
      const day = date.day();
      return ((day !== 0) && (day !== 6) && date.isSameOrAfter(moment().add(-1,'days')));
      //0 means sunday
      //6 means saturday
  }

}
