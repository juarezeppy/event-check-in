import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginToggleService {

  private messageSource = new BehaviorSubject<string>('newUser');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  // This function pushes the next form type to be used by the login component
  changeLoginFormType(type: string) {
    this.messageSource.next(type);
  }
}

