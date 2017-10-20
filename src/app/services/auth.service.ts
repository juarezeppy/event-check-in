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
  private user:           User;
  private userID:         string;
  private accessToken:    string;

  private loginStatus:    boolean;
  private fbProvider:     firebase.auth.FacebookAuthProvider;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    // A subscriber to the user's login/auth state that toggles the login status value
    this.afAuth.authState.subscribe(auth => {
      console.log(auth);
      if (auth === null) {
        this.loginStatus = false;
        this.userID = '';
      } else {
        this.loginStatus = true;
        this.userID = this.afAuth.auth.currentUser.uid;
      }
    });

    this.user = new User;
    this.fbProvider = new firebase.auth.FacebookAuthProvider();

    // add additional fields we need from the api
    this.fbProvider.addScope('public_profile');
    this.fbProvider.addScope('user_friends');
    this.fbProvider.setCustomParameters({               // set login type to popup
      'display': 'popup'
    });
  }

  /*
  * Signup functions EP = email password
  * */
  signupUserEP(firstName: string, lastName: string, email: string, password: string) {
    console.log(firstName, lastName);
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.userID = response.uid;
        // Post new user to database
        this.db.object('users/' + this.userID).update({
          accessToken: 'NULL',
          name:  (firstName + ' ' + lastName)
        });

        this.router.navigate(['/dashboard']);                   // route to dashboard after signup
      })
      .catch(
        error => console.log(error)
      );
  }

  /* *
  * Login functions begin
  * Currently have email & password and Facebook api logins
  * */
  login(email: string, password: string) {
    console.log('login function called');
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.userID = response.uid;                     // <-- get uid for data retrieval
          this.getUserData();                             // <-- get user data from db
          this.router.navigate(['/dashboard']);  // <-- route to their dashboard
        })
      .catch(error => console.log(error)
      );
  }

  loginFB() {
    console.log('called fb login');

    this.afAuth.auth.signInWithPopup(this.fbProvider).then(result => {

      console.log('fb object' , result);
      console.log('getIdToken' , firebase.auth().currentUser.getIdToken());

      this.userID = result.user.uid;
      console.log(this.userID);
      this.getUserData();

      // update user data upon sign in
      this.db.object('users/' + result.user.uid).update({
        accessToken: result.credential.accessToken,
        name: result.user.displayName
      });

      this.router.navigate(['/dashboard']);       // route to dashboard after login
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

  /* *
  * Logout functions
  * */
  logout() {
    console.log('logging out');
    this.afAuth.auth.signOut(); // then calls ngOnInit
  }

  /* *
  * Getter functions for login status and auth
  * */
  getAuthState() {
    return this.afAuth.authState;
  }

  getLoginStatus() {
    return this.loginStatus;
  }

  getUserData () {
    console.log(this.userID);

    firebase.database().ref('users/' + this.userID).once('value')
      .then(snapshot => {
        console.log(snapshot.val());
        this.user.name = snapshot.val().name;
      });
  }

  getUserID() {
    return this.userID;
  }
}
