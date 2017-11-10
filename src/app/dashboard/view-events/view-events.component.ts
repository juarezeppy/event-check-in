import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EventsService} from '../../services/events.service';
import {AuthService} from '../../services/auth.service';
import {ChartDataService} from '../../services/chart-data.service';


@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})

export class ViewEventsComponent implements OnInit {


  eventTitle: string;
  attendeeList: Observable<any[]>;
  eventChoices: Observable<any[]>;
  attendeeCounter: Observable<any>;
  isEventSelected: boolean;

  constructor(private eventService: EventsService, private authService: AuthService, private chartData: ChartDataService) {
    this.eventTitle = 'Select An Event';
    this.isEventSelected = false;
  }

  ngOnInit() {
    // get the users list of events from the database
    this.authService.getAuthState().subscribe(() => {
    this.eventChoices = this.eventService.getEvents();
    });
  }

  /**
   * change Event uses observables to
   * get the event attendees
   * get the event size (num of people invited)
   * then finally we subscribe to the counter which will pass the size onto
   * the chart service which is used to render the chart
   * */
  changeEvent(selectedValue) {
    console.log('getting event:', selectedValue.value.toLowerCase());
    this.eventTitle = selectedValue.value;
    this.attendeeList = this.eventService.getEventData(selectedValue.value.toLowerCase());
    this.attendeeCounter = this.eventService.getEventSize(selectedValue.value.toLowerCase());

    this.attendeeCounter.subscribe(totalAttendees => {
      console.log('Total Attendee Invite Size: ', totalAttendees);
      this.chartData.changeSize(totalAttendees);
      this.chartData.changeCheckIns(selectedValue.value.toLowerCase());
      this.isEventSelected = true;
    });
  }
}

