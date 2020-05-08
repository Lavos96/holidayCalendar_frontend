import { Injectable } from "@angular/core";
import { KeycloakService } from 'keycloak-angular';

@Injectable({providedIn:'root'})
export class KeyCloakUserInfo {

    keyCloakUserProfile;

    constructor(private keyCloakService:KeycloakService){
        this.keyCloakService.loadUserProfile().then((resolve)=>{
            console.log('Profil: ', resolve);
            this.keyCloakUserProfile = resolve;
          },
          (reject)=>{
            console.log('błąd: ', reject);
            this.keyCloakUserProfile = reject;
          });
    }

}