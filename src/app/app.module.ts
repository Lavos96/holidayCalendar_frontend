import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BottomBarComponent } from './bottomBar/bottom-bar/bottom-bar.component';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { CreateHolidaysRequestComponent } from './mainSide/main-side/create-holidays-request/create-holidays-request.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";


registerLocaleData(localePl, 'pl-Pl');
 
const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    MainSideComponent,
    TopBarComponent,
    MainTableComponent,
    BottomBarComponent,
    CreateHolidaysRequestComponent,
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
    MatMenuModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    },
    { provide: LOCALE_ID, useValue: "pl-Pl" }
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
