import {Component, OnInit} from '@angular/core';
import {CheckUsernameService} from '../../services/check-username.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  usernameText: string;
  usernameAvailable: boolean;

  constructor(public checkUserName: CheckUsernameService, private authService: AuthService) {
  }

  ngOnInit() {
    console.log('ngOnInit called');
  }

  checkUsername() {
    this.checkUserName.checkUsername(this.usernameText).snapshotChanges().subscribe(username  => {
      console.log('inside checkUsername callback', username);
      this.usernameAvailable = !username.key;
    });
  }

  updateUsername() {
    console.log('in update username');
    this.checkUserName.updateUsername(this.usernameText);
  }
}
