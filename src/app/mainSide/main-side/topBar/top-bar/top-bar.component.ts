import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

  constructor(protected keycloakAngular: KeycloakService) { }

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

}
