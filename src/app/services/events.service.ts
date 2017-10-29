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
    console.log(this.authService.getUserID());
    return this.db.list('eventAttendees/' + this.authService.getUserID() + '/' + event).valueChanges();
  }

  /***
   * This function creates a new event
   * for the currently logged in user
   */
  createNewEvent(eventName: string) {
    this.db.database.ref((`/events/${this.authService.getUserID()}`))
      .child((`${eventName.toLowerCase()}`))
      .set(eventName);
  }
}
