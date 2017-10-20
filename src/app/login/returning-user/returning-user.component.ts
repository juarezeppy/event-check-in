import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {LoginToggleService} from '../../services/login-toggle.service';

@Component({
  selector: 'app-returning-user',
  templateUrl: './returning-user.component.html',
  styleUrls: ['./returning-user.component.css']
})
export class ReturningUserComponent implements OnInit {

  public isSignUp: boolean; // <!-- determines whether or not to present login or sign form

  form = new FormGroup({
    formUsername: new FormControl('' , [
      Validators.required
    ]),
    formPassWord: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private authService: AuthService, private toggleLogin: LoginToggleService ) {
    this.isSignUp = false;
  }

  ngOnInit() {
  }

  // use all lower case for native validators!!!!
  // example minlength NOT minLength
  get formUsername() {
    return this.form.get('formUsername');
  }

  get formPassWord() {
    return this.form.get('formPassWord');
  }

  setType() {
    console.log('setType called');
    this.toggleLogin.changeLoginFormType('newUser');
  }

  fbLogin() {
    this.authService.loginFB();
  }

  loginEP() {
    console.log(this.formUsername.value, this.formPassWord.value);
    this.authService.login(this.formUsername.value, this.formPassWord.value);
  }
}

