import { Component, OnInit, ViewChild } from '@angular/core';
import { HolidayRequestsService } from 'src/services/http/holidaysRequstes.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RequestHoliday } from 'src/models/request';
import { Router } from '@angular/router';
import { CommunicationBetweenComponentsService } from 'src/services/communicationBetweenComponentsService.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/mainSide/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import * as moment from 'moment';
import { KeyCloakUserInfo } from 'src/services/keyCloakUserInfo.service';

@Component({
  selector: 'app-my-holiday-requests',
  templateUrl: './my-holiday-requests.component.html',
  styleUrls: ['./my-holiday-requests.component.sass']
})
export class MyHolidayRequestsComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[];

  constructor(private holidayRequestService: HolidayRequestsService,
    private router: Router,
    private communicationBetweenComponentsService: CommunicationBetweenComponentsService,
    public dialog: MatDialog,
    private keyCloakUserInfo: KeyCloakUserInfo) { }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'employee', 'startDate', 'endDate', 'reason', 'requested', 'lastChange', 'type', 'status', 'actions'];
    this.holidayRequestService.getHolidayRequestsByUserList(null,{email:this.keyCloakUserInfo.keyCloakUserProfile.email},false).subscribe((requests)=>{
      this.dataSource.data = requests;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  editHolidayRequest(element: RequestHoliday){
    this.communicationBetweenComponentsService.requestToEditBehSubject.next(element);
    this.router.navigateByUrl('editHolidayRequest');
  }

  onCancelHolidayRequest(element: RequestHoliday){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        const holidayReq = {id:element.id,
          employee: element.employee,
          startDate: element.startDate,
          endDate: element.endDate,
          reason: element.reason,
          requested: element.requested,
          lastChange: moment().add(2,'hour').toISOString(),
          typeId: element.type.id,
          statusId: 4};
        this.holidayRequestService.modifiyHolidayRequest(null,holidayReq,false).subscribe((cancelled)=>{
          console.log('Cancelled: ', cancelled);
          this.holidayRequestService.getHolidayRequestsByUserList(null,{email:this.keyCloakUserInfo.keyCloakUserProfile.email},false).subscribe((requests)=>{
            this.dataSource.data = requests;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        })
      }
    });
   }

   proposalToPdf(element: RequestHoliday){
    this.communicationBetweenComponentsService.requestToPrintBehSubject.next(element);
    this.router.navigateByUrl('printProposalToPdf')
  }

}
