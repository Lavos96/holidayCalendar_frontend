import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommunicationBetweenComponentsService } from 'src/services/communicationBetweenComponentsService.service';
import { Subscription } from 'rxjs';
import { RequestHoliday } from 'src/models/request';
import { Router } from '@angular/router';
import { KeyCloakUserInfo } from 'src/services/keyCloakUserInfo.service';
import { KeycloakService } from 'keycloak-angular';
import { StatusHolidayRequest } from 'src/models/status';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { TypesOfHolidaysService } from 'src/services/http/typesOfHolidays.service';
import { StatusesOfHolidaysRequestsService } from 'src/services/http/statusesOfHolidayRequests.service';
import { HolidayRequestsService } from 'src/services/http/holidaysRequstes.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-holiday-request',
  templateUrl: './edit-holiday-request.component.html',
  styleUrls: ['./edit-holiday-request.component.sass']
})
export class EditHolidayRequestComponent implements OnInit, OnDestroy {
  holidayTypes: string[];
  holidayRequestStatuses: string[];
  statuses: StatusHolidayRequest[];
  selectedType;
  selectedStatus;
  holidayRequestForm = new FormGroup({
    startDate: new FormControl('', [Validators.required, this.isValidDate(), this.isNotWeekend(), this.isStartDateBeforeEndDate()]),
    endDate: new FormControl('', [Validators.required, this.isValidDate(), this.isNotWeekend(), this.isEndDateAfterStartDate()]),
    reason: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    status: new FormControl('')
  });

  editHolidayRequestSubscription: Subscription;
  editReqeust: RequestHoliday;
  isAdmin: boolean = false;

  constructor(private communicationBetweenComponentsService: CommunicationBetweenComponentsService,
    private router: Router,
    private keyCloakUserInfo: KeyCloakUserInfo,
    private keyCloakService: KeycloakService,
    private typesOfHolidaysRequest: TypesOfHolidaysService,
    private statusesOfHolidayRequest: StatusesOfHolidaysRequestsService,
    private cdr: ChangeDetectorRef,
    private holidayRequestsService: HolidayRequestsService,
    private _location: Location) { }

  ngOnInit(): void {
    this.editHolidayRequestSubscription = this.communicationBetweenComponentsService.requestToEditBehSubject.subscribe((request) => {
      this.typesOfHolidaysRequest.getTypesList(null, false).subscribe((types) => {
        this.holidayTypes = types;
      });
      this.statusesOfHolidayRequest.getStatusesList(null,false).subscribe((statuses)=>{
        this.statuses = statuses;
      })
      this.editReqeust = request;
      if (this.editReqeust === null) {
        this.router.navigateByUrl('');
      } else {
        //if (this.keyCloakUserInfo.keyCloakUserProfile.email !== request.employee) {
          if (!this.keyCloakService.isUserInRole('admin')) {
            this.router.navigateByUrl('');
          } else {
            this.isAdmin = true;
          }
        //}
        this.updateFormValue();
        this.cdr.detectChanges();
      }
    })
  }

  updateFormValue(){
    this.holidayRequestForm.patchValue({
      startDate: moment(this.editReqeust.startDate),
          endDate: moment(this.editReqeust.endDate),
          reason: this.editReqeust.reason,
          type: this.editReqeust.type,
          status: this.editReqeust.status,
    });
    this.selectedType=this.editReqeust.type;
    this.selectedStatus = this.editReqeust.status;
  }

  ngOnDestroy(): void {
    if(this.editHolidayRequestSubscription){
      this.editHolidayRequestSubscription.unsubscribe();
    }
  }

  checkIfValuesAreDifferent(){
    if(moment(this.editReqeust.startDate).isSame(this.holidayRequestForm.get('startDate').value,'year')&&
    moment(this.editReqeust.startDate).isSame(this.holidayRequestForm.get('startDate').value, 'month')&&
    moment(this.editReqeust.startDate).isSame(this.holidayRequestForm.get('startDate').value, 'day')&&
    moment(this.editReqeust.endDate).isSame(this.holidayRequestForm.get('endDate').value, 'year')&&
    moment(this.editReqeust.endDate).isSame(this.holidayRequestForm.get('endDate').value, 'month') &&
     moment(this.editReqeust.endDate).isSame(this.holidayRequestForm.get('endDate').value, 'day') &&
    this.holidayRequestForm.get('reason').value===this.editReqeust.reason && 
    this.holidayRequestForm.get('type').value.name===this.editReqeust.type.name &&
    this.holidayRequestForm.get('status').value.name===this.editReqeust.status.name) {
      return true;
    } else {
      return false;
    }
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
      return ((day !== 0) && (day !== 6) && (date.isSameOrAfter(moment(this.editReqeust.startDate).add(-1,'days'))));
      //0 means sunday
      //6 means saturday
  }

  endDateFilter: (date: moment.Moment | null) => boolean =
    (date: moment.Moment | null) => {
      const day = date.day();
      return ((day !== 0) && (day !== 6) && date.isSameOrAfter(moment(this.editReqeust.endDate).add(-1,'days')));
      //0 means sunday
      //6 means saturday
  }

  compareFunction(o1: any, o2: any) {
    return (o1.name == o2.name && o1.id == o2.id);
   }

   onSubmit(){
    const requestesStatus = this.statuses.find(status=> status.id===1);
    const holidayReq = {id:this.editReqeust.id,
      employee: this.keyCloakUserInfo.keyCloakUserProfile.email,
      startDate: this.holidayRequestForm.get('startDate').value.add(2,'hour').toISOString(),
      endDate: this.holidayRequestForm.get('endDate').value.add(2,'hour').toISOString(),
      reason: this.holidayRequestForm.get('reason').value,
      requested: this.editReqeust.requested,
      lastChange: moment().add(2,'hour').toISOString(),
      typeId: this.holidayRequestForm.get('type').value.id,
      statusId: this.isAdmin===false?requestesStatus.id:this.holidayRequestForm.get('status').value.id};
    this.holidayRequestsService.modifiyHolidayRequest(null,holidayReq,false).subscribe((holidayRequest)=>{
      this._location.back();
    })
   }

}
