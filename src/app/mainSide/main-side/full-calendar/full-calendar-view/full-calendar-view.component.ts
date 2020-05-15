import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Calendar, OptionsInput, EventInput } from '@fullcalendar/core';
import plLocale from '@fullcalendar/core/locales/pl';
import { HolidayRequestsService } from 'src/services/http/holidaysRequstes.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';

@Component({
  selector: 'app-full-calendar-view',
  templateUrl: './full-calendar-view.component.html',
  styleUrls: ['./full-calendar-view.component.sass']
})
export class FullCalendarViewComponent implements OnInit, AfterViewInit {

  calendar: Calendar;
  plLocale = plLocale;
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  @ViewChild('calendar') fullCalendar;
  calendarOptions: OptionsInput = {
    plugins: [dayGridPlugin, interactionPlugin],
    locale: plLocale,
  };
  calendarHolidaysEvents: EventInput = []; 

  constructor(private holidaysRequests: HolidayRequestsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){

    this.holidaysRequests.getRequestsList(null, false).subscribe((holidaysRequests) => {
      const requestsToDisplay = holidaysRequests.filter((req)=>{
        return req.status.id===2;
      })
      const holidaysEvents = [];
      requestsToDisplay.forEach(element => {
         // holidaysEvents.push({title:`Urlop użytkownika: ${element.employee}`, start: element.startDate, end: element.endDate});
         holidaysEvents.push({title:`Urlop użytkownika: ${element.employee}`, start: moment(element.startDate).format('YYYY-MM-DD').toString(), end: moment(element.endDate).add(1,'day').format('YYYY-MM-DD').toString()});
      });
      this.calendarHolidaysEvents = holidaysEvents;
    })
    
  }

}
