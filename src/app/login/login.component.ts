import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {LoginToggleService} from '../services/login-toggle.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public formType: string; // <!-- determines whether or not to present login or sign form

  form = new FormGroup({
    formUsername: new FormControl('' , [
      Validators.required
    ]),
    formPassWord: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private authService: AuthService, private toggleLogin: LoginToggleService ) {
    this.formType = 'newUser';
  }

  ngOnInit() {
    // Subscriber to listen to isSignUp changes to toggle template components
    console.log('in login onInit');

    this.toggleLogin.currentMessage.subscribe( formVal => {
      console.log(formVal);
      this.formType = formVal;
    });


  }

  // use all lower case for native validators!!!!
  // example minlength NOT minLength

  get formUsername() {
    return this.form.get('formUsername');
  }

  get formPassWord() {
    return this.form.get('formPassWord');
  }

  fbLogin() {
    this.authService.loginFB();
  }

  loginEP() {
    console.log(this.formUsername.value, this.formPassWord.value);
    this.authService.login(this.formUsername.value, this.formPassWord.value);
  }
}
