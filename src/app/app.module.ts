import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DoBootstrap, ApplicationRef } from '@angular/core';
import { KeycloakAngularModule, KeycloakService, KeycloakConfig } from 'keycloak-angular';
import { MainSideComponent } from './mainSide/main-side/main-side.component';
import { TopBarComponent } from './mainSide/main-side/topBar/top-bar/top-bar.component';
import { MainTableComponent } from './mainSide/main-side/mainTable/main-table/main-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { BottomBarComponent } from './bottomBar/bottom-bar/bottom-bar.component';
import { HttpClientModule } from '@angular/common/http';
 
const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    MainSideComponent,
    TopBarComponent,
    MainTableComponent,
    BottomBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  //bootstrap: [AppComponent]
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    console.log(window.location.origin);
    let keycloakConfig: KeycloakConfig = {
      url: 'http://localhost:8080/auth',
      realm: 'HolidayCalendar',
      clientId: 'HolidayCalendarAngularClient',   
      "credentials": {
      "secret": "4d582a7e-511f-4715-9f6a-5840176de4e9"
      }
      };
    keycloakService
      .init({config: keycloakConfig,  initOptions: {
        onLoad: 'check-sso',
        //silentCheckSsoRedirectUri: window.location.origin + '/silentCheck'
    }})
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');
        appRef.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
}
