import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from './home/home.component';

// Auth Guard
import {AuthGuardService} from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home'} },
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] , data: { title: 'Dashboard'} },
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
