import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * Invite-Count service is a service that allows the navbar
 * to display active pending event invites to the user
 * The auth service will push new values to it while
 * the navbar subscribes to those values
 * */


@Injectable()
export class InviteCountService {
  private eventSize = new BehaviorSubject<number>(0);
  currentInviteCount = this.eventSize.asObservable();

  constructor() { }

  changeSize(size: number) {
    console.log(size);
    this.eventSize.next(size);
  }
}
