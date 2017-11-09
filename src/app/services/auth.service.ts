/* *
*This is a central authentication service that handles
*login/logout functions & the user's current login status function
* The service also instantiates one USER class to read common data from
*/
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { User } from '../models/user';


@Injectable()
export class AuthService {
  private currentUser:    User;
  private accessToken:    string;
  private loginStatus:    boolean;
  private fbProvider:     firebase.auth.FacebookAuthProvider;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    // Facebook provider used for popup authentication
    this.fbProvider = new firebase.auth.FacebookAuthProvider();

    // add additional fields we need from the api
    this.fbProvider.addScope('public_profile');
    this.fbProvider.addScope('user_friends');
    this.fbProvider.setCustomParameters({               // set login type to popup
      'display': 'popup'
    });

    // A subscriber to the user's login/auth state that toggles the login status value
    this.afAuth.authState.subscribe(auth => {
      console.log('checking auth');
      this.currentUser = new User;
      if (auth) {
        console.log('authenticated');
        this.loginStatus = true;
        this.currentUser.ID = this.afAuth.auth.currentUser.uid;
        this.getUserData();
      } else {
        this.loginStatus = false;
        this.currentUser.ID = '';
      }
    });
  }

  /**
  * Signup functions EP = email password
  * */
  signupUserEP(firstName: string, lastName: string, email: string, password: string) {
    console.log(firstName, lastName);
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.currentUser.ID = response.uid;

        // Post new user to database
        this.db.object('users/' + this.currentUser.ID).update({
          accessToken: 'NULL',
          name:  (firstName + ' ' + lastName)
        });
        this.router.navigate(['/addEvent']);
      })
      .catch(
        error => console.log(error)
      );
  }


  /**
   * Login functions begin
   * Currently have email & password and Facebook api logins
   * */
  login(email: string, password: string) {
    console.log('login function called');
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.currentUser.ID = response.uid;                     // <-- get uid for data retrieval
          this.router.navigate(['/viewevents']);
        })
      .catch(error => console.log(error)
      );
  }

  loginFB() {
    console.log('called fb login');

    this.afAuth.auth.signInWithPopup(this.fbProvider).then(result => {

      console.log('fb object' , result);
      console.log('getIdToken' , firebase.auth().currentUser.getIdToken());

      this.currentUser.ID = result.user.uid;
      console.log(this.currentUser.ID);

      // update user data upon sign in
      this.db.object('users/' + result.user.uid).update({
        accessToken: result.credential.accessToken,
        name: result.user.displayName
      });
      this.router.navigate(['/viewevents']);
    })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;                       // The email of the user's account used.
        const credential = error.credential;             // The firebase.auth.AuthCredential type that was used.
      });
    console.log('end fb login');
  }

  /**
   * getter for id
   * */
  getUserID() {
    return this.currentUser.ID;
  }

  /**
   * getter for username
   * */
  getUsername() {
    return this.currentUser.username;
  }

  /**
   * This function ends authentication
   * */
  logout() {
    console.log('logging out');
    this.router.navigate(['/']);
    this.afAuth.auth.signOut();

  }

  /**
   * This function returns the auth state observable
   * */
  getAuthState() {
    return this.afAuth.authState;
  }

  // Used to return true or false to render components
  getLoginStatus() {
    return this.loginStatus;
  }

  /**
   * This function returns a user object and populates
   * */
  getUserData () {
    this.db.object('users/' + this.currentUser.ID).valueChanges().subscribe((snap: User) => {
      console.log(snap);
      this.currentUser.name = snap.name;
      this.currentUser.username = snap.username;
    });
  }

}
