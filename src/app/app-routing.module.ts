import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from 'src/services/appAuthGuard.service';
import { AppComponent } from './app.component';
import { CreateHolidaysRequestComponent } from './mainSide/main-side/create-holidays-request/create-holidays-request.component';
import { MainTableComponent } from './mainSide/main-side/mainTable/main-table/main-table.component';
import { MyHolidayRequestsComponent } from './mainSide/main-side/my-holiday-requests/my-holiday-requests/my-holiday-requests.component';
import { EditHolidayRequestComponent } from './mainSide/edit-holiday-request/edit-holiday-request/edit-holiday-request.component';
import { FullCalendarViewComponent } from './mainSide/main-side/full-calendar/full-calendar-view/full-calendar-view.component';
import { ProposalToPdfComponent } from './mainSide/proposal-to-pdf/proposal-to-pdf/proposal-to-pdf.component';


const routes: Routes = [
  /*{ 
    path: 'some-path-only-super-user-can-access', 
    loadChildren: () => SomeModule ,
    canActivate: [AppAuthGuard], 
    data: { roles: ['SuperUser'] }
  },
  { 
    path: 'some-other-path', 
    loadChildren: () => SomeOtherModule ,
    canActivate: [AppAuthGuard], 
    data: { roles: ['SuperUser', 'NormalUser'] }
  },*/
  /*{ 
    path: '', 
    //loadChildren: () => SomeOtherModule ,
    redirectTo: '',
    pathMatch: 'full',
    component: AppComponent,
    canActivate: [AppAuthGuard], 
    data: { roles: ['admin', 'employer'] }
  },*/
  { 
    path: '', 
    //loadChildren: () => SomeOtherModule ,
    redirectTo: '',
    pathMatch: 'full',
    component: MainTableComponent,
    canActivate: [AppAuthGuard], 
    data: { roles: ['admin', 'employer'] }
  },
  {
    path: 'createHolidaysRequest',
    component: CreateHolidaysRequestComponent
  },
  {
    path: 'myHolidaysRequest',
    component: MyHolidayRequestsComponent
  },
  {
    path: 'editHolidayRequest',
    component: EditHolidayRequestComponent
  },
  {
    path: 'calendarView',
    component: FullCalendarViewComponent
  },
  {
    path: 'printProposalToPdf',
    component: ProposalToPdfComponent
  },
  {path:'', component: MainTableComponent , pathMatch: 'full'},
  {path:'**', component:MainTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
