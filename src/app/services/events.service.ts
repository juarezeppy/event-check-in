import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';
import {EventInvite} from '../models/eventInvite';
import {Observable} from 'rxjs/Observable';

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
    console.log(this.authService.getUsername());
    return this.db.list(`eventAttendees/${this.authService.getUsername()}/${event}/users`).valueChanges();
  }

  /**
   * This function returns an observable
   * that is the number of attendees for a given event
   * This value is used to be passed onto the chartService for rendering (max)
   * */
  getEventSize (event: string) {
    return this.db.object(`eventAttendees/${this.authService.getUsername()}/${event}/size/total`).valueChanges();
  }


  /**
   * This function returns an observable
   * that is the number of check-in attendees for an event
   * This value is used to be passed onto the chartService for rendering
   * */
  getCheckIns (event: string) {
    return this.db.object(`eventCounters/${this.authService.getUsername()}/${event}`).valueChanges();
  }


  /***
   * This function creates a new event
   * for the currently logged in user
   */
  createNewEvent(eventObject: any) {
    // Create a new event for the user who created the event
    this.db.database.ref((`/events/${this.authService.getUserID()}`))
      .child((`${eventObject.eventName.toLowerCase()}`))
      .set(eventObject.eventName);

    // create a db object for the user who to hold the  checked-in user count
    this.db.database.ref((`/eventCounters/${this.authService.getUsername()}`))
      .child((`${eventObject.eventName.toLowerCase()}`))
      .set(0);


    // maybe use a cloud function to grab id and set it to to the db after the push?
    // Create a db object that list forms attendee for the user who created it
    // This will probably need to be looped for every use invited...
    this.db.database.ref((`/eventAttendees/${this.authService.getUsername()}`))
      .child((`${eventObject.eventName.toLowerCase()}/users`))
      .child((`${eventObject.attendees}`))
      .set({
        checkIn: false,
        id: 100000,
        name: `${eventObject.attendees}`
      });

    // create a db invite object that will be pushed to EVERY user
    // invited to the event from the form. This will probably need be to looped
    this.db.database.ref((`/eventInvites/${eventObject.attendees}`))
      .child(`${this.authService.getUsername()}/${eventObject.eventName}`)
      .set(false);

    this.db.database.ref((`/eventInvites/${eventObject.attendees}`))
      .child(`/_newInvites`)
      .transaction( val => {
        if (val === 0) {
          return 1;
        }

        val = val + 1;
        return val;
      });
  }

  getEventInvites(): Observable<EventInvite[]> {
    return this.db.list(`eventInvites/${this.authService.getUsername()}/juarezeppy`).valueChanges();
  }
}
