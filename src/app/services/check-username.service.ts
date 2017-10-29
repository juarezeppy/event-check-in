/***
 * The Check Username Service is responsible
 * For verifying if a username exist the in database or not
 * And verifying if the user already has a name
 * */
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class CheckUsernameService {

  constructor(private authService: AuthService, private db: AngularFireDatabase) {
}

  /**
   * This function checks to see if the username is available from the db
   * */
  checkUsername(username: string) {
    console.log('checking username');
    username = username.toLowerCase();
    return this.db.object(`usernames/${username}`);
  }

  /**
   * This function takes the username entered then
   * adds it to the user and usernames document in the db
   */
  updateUsername(username: string) {
    const data = {};
    data[username] = this.authService.getUserID();
    console.log(data);
    this.db.object(`/users/${this.authService.getUserID()}`).update({'username': username});
    this.db.object(`/usernames`).update(data);
  }

  /**
   * This function checks if the user has a username
   * from the auth service
   * */
  hasUsername(): boolean {
    if (this.authService.getUsername() === undefined) {
  //    console.log('getUsername false');
      return false;
    } else {
//      console.log('getUsername true');
      return true;
    }
  }
}
