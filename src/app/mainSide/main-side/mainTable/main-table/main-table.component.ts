import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HolidayRequestsService } from 'src/services/http/holidaysRequstes.service';
import { TypesOfHolidaysService } from 'src/services/http/typesOfHolidays.service';
import { StatusesOfHolidaysRequestsService } from 'src/services/http/statusesOfHolidayRequests.service';
import { StatusHolidayRequest } from 'src/models/status';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.sass']
})
export class MainTableComponent implements OnInit {

  holidayTypes: string[];
  statuses;
  statusesToDisplay: { status: StatusHolidayRequest, checked: boolean, class: string }[] = [];
  displayedColumns: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  inputEmployeeFilterValue: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('typesFilter') typesFilter: MatSelect;
  @ViewChild('inputEmployee') inputEmployeeFilter: MatInput;

  constructor(private holidaysRequests: HolidayRequestsService,
    private typesOfHolidaysRequest: TypesOfHolidaysService,
    private statusesOfHolidaysRequests: StatusesOfHolidaysRequestsService,) { }

  ngOnInit(): void {
    this.typesOfHolidaysRequest.getTypesList(null, false).subscribe((types) => {
      this.holidayTypes = types;
    })
    this.statusesOfHolidaysRequests.getStatusesList(null, false).subscribe((statuses) => {
      this.statuses = statuses;
      this.statuses.forEach(status => {
        switch (status.name) {
          case 'Zaakceptowany':
            this.statusesToDisplay.push({ status: status, checked: false, class: 'accepted-chip' });
            break;
          case 'Zgłoszony':
            this.statusesToDisplay.push({ status: status, checked: false, class: '' });
            break;
          case 'Odrzucony':
            this.statusesToDisplay.push({ status: status, checked: false, class: 'rejected-chip' });
            break;
          case 'Anulowany':
            this.statusesToDisplay.push({ status: status, checked: false, class: 'cancelled-chip' });
            break;
          default:
            this.statusesToDisplay.push({ status: status, checked: false, class: '' })
            break;
        }
      });
    })
    this.displayedColumns = ['id', 'employee', 'startDate', 'endDate', 'reason', 'requested', 'lastChange', 'type', 'status'];
    this.holidaysRequests.getRequestsList(null, false).subscribe((holidaysRequests) => {
      console.log('HolidayRequests: ', holidaysRequests);
      this.dataSource.data = holidaysRequests;
    })
    this.dataSource.paginator = this.paginator;
  }

  onFilter() {
    // pobieramy liste requestów z backendu
    this.holidaysRequests.getRequestsList(null, false).subscribe((requests) => {
      //sprawdzamy czy jest zaznaczony jakis filtr typu, jesli jest to filtrujemy odpowiedz po typie
      if (this.typesFilter.value!==undefined) {
        requests=requests.filter((elem) => {
          if (elem.type.name === this.typesFilter.value.name) {
            return elem;
          }
        })
      }

      const filteredByStatuses = [];
      let filtered = [];
      // Wybieramy te Statusy ktore sa zaznaczone jako checked
      this.statusesToDisplay.forEach((status) => {
        if (status.checked) {
          filteredByStatuses.push(status.status)
        }
      })
      // jesli sa jakies zaznaczone to filtrujemy requesty po tych statusach
      if(filteredByStatuses.length>0){
        filteredByStatuses.forEach(byStat => {
          requests.forEach(req => {
            if (req.status.id === byStat.id) {
              filtered.push(req);
            }
          })
    
        })
        // usuwamy requesty undefined (mogą się takie pojawić jesli zaznaczymy jakis status a nie ma requesta o takim statusie)
        filtered = filtered.filter(n => n !== undefined)
        requests = filtered;
      }
      // sprawdzamy czy jest coś wpisane w inputa do filtrowania po zgłaszającym
      if(this.inputEmployeeFilter.value){
        requests.filter((request)=>{
          if(request.employee.includes(this.inputEmployeeFilter.value)){
            return request;
          }
        })
      }
      // dopisujemy przefiltrowane dane jako zrodla danych tablicy
      this.dataSource.data = requests
    });
  }

  onSearchChange(searchValue: string): void {  
    this.inputEmployeeFilterValue = searchValue;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  onClearFilters(){
    this.typesFilter.value = undefined;
    this.statusesToDisplay.forEach((stat)=>{
      stat.checked = false;
    });
    this.inputEmployeeFilter.value = null;
    this.inputEmployeeFilterValue = '';
    this.holidaysRequests.getRequestsList(null,false).subscribe((requests)=>{
      this.dataSource.data = requests;
      this.dataSource.filter = null;
    })
  }

}
