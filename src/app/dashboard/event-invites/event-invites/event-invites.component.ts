import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EventsService} from '../../../services/events.service';
import {EventInvite} from '../../../models/eventInvite';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-event-invites',
  templateUrl: './event-invites.component.html',
  styleUrls: ['./event-invites.component.css']
})
export class EventInvitesComponent implements OnInit {

  hasEvents: boolean;
  eventInvites: Observable<any[]>;

  constructor(private eventService: EventsService) {
    this.hasEvents = false;
  }

  ngOnInit() {
    this.eventInvites = this.eventService.getEventInvites();
    this.eventInvites.subscribe((value: EventInvite[]) => {

      if (value.length > 0) {
        this.hasEvents = true;

        value.forEach( event => {
          console.log(event);
        });

      }

    });
  }
}
