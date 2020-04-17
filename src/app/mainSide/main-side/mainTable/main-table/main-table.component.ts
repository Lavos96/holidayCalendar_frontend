import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HolidayRequestsService } from 'src/services/http/holidaysRequstes.service';
import { TypesOfHolidaysService } from 'src/services/http/typesOfHolidays.service';
import { StatusesOfHolidaysRequestsService } from 'src/services/http/statusesOfHolidayRequests.service';
import { StatusHolidayRequest } from 'src/models/status';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.sass']
})
export class MainTableComponent implements OnInit {

  holidayTypes: string[];
  planned=false;
  accepted=false;
  requested=false;
  rejected=false;
  statuses;
  statusesToDisplay: {status:StatusHolidayRequest, checked: boolean, class: string}[] =[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private holidaysRequests: HolidayRequestsService,
    private typesOfHolidaysRequest: TypesOfHolidaysService,
    private statusesOfHolidaysRequests: StatusesOfHolidaysRequestsService) { }

  ngOnInit(): void {
    this.typesOfHolidaysRequest.getTypesList(null,false).subscribe((types)=>{
      this.holidayTypes = types;
    })
    this.statusesOfHolidaysRequests.getStatusesList(null,false).subscribe((statuses)=>{
        this.statuses=statuses;
        console.log(statuses);
        this.statuses.forEach(status => {
          switch(status.name){
            case 'Zaakceptowany':
              this.statusesToDisplay.push({status:status,checked:false,class: 'accepted-chip'});
            break;
            case 'Zgłoszony':
              this.statusesToDisplay.push({status:status,checked:false,class:''});
            break;
            case 'Odrzucony':
              this.statusesToDisplay.push({status:status,checked:false,class:'rejected-chip'});
            break;
            case 'Anulowany':
              this.statusesToDisplay.push({status:status,checked:false,class:'cancelled-chip'});
            break;
            default:
              this.statusesToDisplay.push({status:status,checked:false,class:''})
            break;
          }
        });
    })
    this.displayedColumns = ['id', 'startDate', 'endDate', 'reason','requested','lastChange','type','status'];
    this.holidaysRequests.getCategoriesList(null,false).subscribe((holidaysRequests)=>{
      this.dataSource.data = holidaysRequests;
    })
    this.dataSource.paginator = this.paginator;
  }

}
