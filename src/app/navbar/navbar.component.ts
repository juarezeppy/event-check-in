import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {LoginToggleService} from '../services/login-toggle.service';
import {InviteCountService} from '../services/invite-count.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;
  pendingInvites: number;

  constructor(private router: Router, private authService: AuthService,
              private toggleLogin: LoginToggleService, private inviteCount: InviteCountService ) { }

  ngOnInit() {
    // Subscriber to listen to login changes
    this.authService.getAuthState().subscribe(authState => {
      this.loggedIn = this.authService.getLoginStatus();
      console.log(authState);
    });

    // Subscribe to the current events max for the chart
    this.inviteCount.currentInviteCount.subscribe(count => {
      this.pendingInvites = count;
    });
  }

  /***
   *This function pushes a next value on to the BehaviorSubject observable
   * Or ends authentication if logout is clicked
   */
  routeClick(type: string) {
    if (type === 'returningUser') {
      this.toggleLogin.changeLoginFormType('returningUser');
      this.router.navigate(['/login']);
    } else if (type === 'newUser') {
        this.toggleLogin.changeLoginFormType('newUser');
        this.router.navigate(['/login']);
    } else {
        this.authService.logout();
    }
  }

}
