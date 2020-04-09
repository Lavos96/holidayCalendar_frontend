import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(protected router: Router, 
    protected keycloakAngular: KeycloakService){}

  ngOnInit(): void {
    try {
      let userDetails = this.keycloakAngular.getKeycloakInstance().tokenParsed["userDetails"];
      let token = this.keycloakAngular.getToken().then((data)=>{
        console.log('Token: ', data);
        let name = this.keycloakAngular.getUsername();
        let tmp = this.keycloakAngular.getUserRoles();
        let odp = this.keycloakAngular.isUserInRole('admin');
        //this.keycloakAngular.getKeycloakInstance().register();
        console.log('Parsed token: ',this.keycloakAngular.getKeycloakInstance().idTokenParsed);
        console.log('encoded token: ', this.keycloakAngular.getKeycloakInstance().idToken);
        console.log('Czy adminem? ', odp);
        console.log('role: ', tmp);
        console.log('name: ', name);
      });
      console.log('User details: ', userDetails);
    } catch (e){
      console.log('Failed to load user details', e);
    }
  }
  title = 'holidayCalendarFrontend';
}
