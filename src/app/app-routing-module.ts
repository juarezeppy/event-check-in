import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App Components
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddEventComponent } from './dashboard/add-event/add-event.component';

// Auth Guard
import {AuthGuardService} from './services/auth-guard.service';
import {ViewEventsComponent} from './dashboard/view-events/view-events.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home'} },
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { path: 'viewevents', component: ViewEventsComponent, canActivate: [AuthGuardService] , data: { title: 'ViewEvents'} },
  { path: 'addevent', component: AddEventComponent, canActivate: [AuthGuardService], data: {title: 'AddEvent'} },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: false}) // <-- debugging purposes only
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
