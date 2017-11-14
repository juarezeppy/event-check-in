import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ReturningUserComponent } from './login/returning-user/returning-user.component';
import { LinearGaugeChartComponent } from './charts/linear-gauge-chart/linear-gauge-chart.component';
import { EventFormComponent } from './dashboard/add-event/event-form/event-form.component';
import { AddEventComponent } from './dashboard/add-event/add-event.component';
import { ViewEventsComponent } from './dashboard/view-events/view-events.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {EventInvitesComponent} from './dashboard/event-invites/event-invites/event-invites.component';
import { GoogleMapComponent } from './map/google-map/google-map.component';

// Charts
import {NgxChartsModule} from '@swimlane/ngx-charts';

// AGM Google Maps
import { AgmCoreModule } from '@agm/core';


// Animaions
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Forms
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Routing module
import {AppRoutingModule} from './app-routing-module';

// Services
import {HttpModule} from '@angular/http';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AuthService} from './services/auth.service';
import {LoginToggleService} from './services/login-toggle.service';
import {EventsService} from './services/events.service';
import {ChartDataService} from './services/chart-data.service';
import {AuthGuardService} from './services/auth-guard.service';
import {CheckUsernameService} from './services/check-username.service';
import {InviteCountService} from './services/invite-count.service';

// Firebase config and APIs
import {firebaseConfig} from '../firebaseConfig';
import {googleMapsAPIKey} from '../keys/mapsAPI';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SignUpComponent,
    ReturningUserComponent,
    LinearGaugeChartComponent,
    AddEventComponent,
    ViewEventsComponent,
    SpinnerComponent,
    EventFormComponent,
    EventInvitesComponent,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
      apiKey: googleMapsAPIKey
    })
  ],
  providers: [AuthService, LoginToggleService, EventsService,
    ChartDataService, AuthGuardService, CheckUsernameService, InviteCountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
