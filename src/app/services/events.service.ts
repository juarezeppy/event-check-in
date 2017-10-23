import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';

@Injectable()
export class EventsService {

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
  }

  /**
   * This function returns an observable
   * that is the list of events
   * */
  getEvents() {
    return this.db.list('events/' + this.authService.getUserID()).valueChanges();
  }

  /**
   * This function returns an observable
   * that is the list of attendees for a particular event
   * */
  getEventData (event: string) {
    return this.db.list('eventAttendees/' + this.authService.getUserID() + '/' + event).valueChanges();
  }
}
