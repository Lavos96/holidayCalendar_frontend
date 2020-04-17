import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from 'src/services/appAuthGuard.service';
import { AppComponent } from './app.component';


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
  { 
    path: '', 
    //loadChildren: () => SomeOtherModule ,
    redirectTo: '',
    pathMatch: 'full',
    component: AppComponent,
    canActivate: [AppAuthGuard], 
    data: { roles: ['admin', 'employer'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
