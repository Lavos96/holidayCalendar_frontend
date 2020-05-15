import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

  constructor(protected keycloakAngular: KeycloakService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.keycloakAngular.logout().then(()=>{
      this.keycloakAngular.isLoggedIn().then((resp)=>{
        console.log('Wylogowany?: ', resp);
      })
      console.log('Logout: ')
    })
  }

  moveToHolidayRequestCreation(){
    this.router.navigateByUrl('createHolidaysRequest');
  }

  moveToMainPage(){
    this.router.navigateByUrl('');
  }

  moveToMyHolidayRequests(){
    this.router.navigateByUrl('myHolidaysRequest');
  }

  moveToCalendarView(){
    this.router.navigateByUrl('calendarView');
  }

}
