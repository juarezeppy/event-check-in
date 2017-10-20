import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {LoginToggleService} from '../../services/login-toggle.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form = new FormGroup({
    formFirstName: new FormControl('', [
      Validators.required
    ]),
    formLastName: new FormControl('', [
      Validators.required
    ]),
    formUsername: new FormControl('' , [
      Validators.required,
      Validators.email
    ]),
    formPassWord: new FormControl('', [
      Validators.required
    ]),
    formVerifyPassWord: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private authService: AuthService, private toggleLogin: LoginToggleService) { }

  ngOnInit() {
  }

  // use all lower case for native validators!!!!
  // example minlength NOT minLength
  // use all lower case for native validators!!!!
  get formUsername() {
    return this.form.get('formUsername');
  }

  get formPassWord() {
    return this.form.get('formPassWord');
  }

  get formVerifyPassWord() {
    return this.form.get('formVerifyPassWord');
  }

  get formFirstName() {
    return this.form.get('formFirstName');
  }

  get formLastName() {
    return this.form.get('formLastName');
  }

  equalPasswords() {
    if (this.formVerifyPassWord.value === this.formPassWord.value) {
      return true;
    }
    return false;
  }

  setType() {
    console.log('setType called');
    this.toggleLogin.changeLoginFormType('returningUser');
  }

  signUp() {
    // Remember to fix First/Last name space issues 'John' instead of '     John  ' <-- space issue
    this.authService.signupUserEP(this.formFirstName.value, this.formLastName.value, this.formUsername.value, this.formPassWord.value);
  }

  fbSignUp() {
    this.authService.loginFB();
  }
}
