import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from './auth.service';

@Injectable()
export class EventsService {

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
  }

  getEvents() {
    return this.db.list('events/' + this.authService.getUserID()).valueChanges();
  }

  getEventData (event: string) {
    return this.db.list('eventAttendees/' + this.authService.getUserID() + '/' + event).valueChanges();
  }
}
