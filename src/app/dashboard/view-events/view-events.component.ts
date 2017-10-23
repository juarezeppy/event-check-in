import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
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
  attendees: Observable<any[]>;
  eventSize: Observable<any[]>;
  eventChoices: Observable<any[]>;
  counter: number;
  isEventSelected: boolean;


  constructor(private db: AngularFireDatabase, private eventService: EventsService,
              private authService: AuthService, private chartData: ChartDataService) {
    this.eventTitle = 'Select An Event';
    this.counter = 0;
    this.isEventSelected = false;
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe(() => {
      this.eventChoices = this.eventService.getEvents();
    });
  }

  changeEvent(selectedValue) {
    console.log('getting event:', selectedValue.value);

    if (this.eventTitle !== '') {
      this.eventTitle = selectedValue.value;
      this.attendees = this.eventService.getEventData(this.eventTitle.toLowerCase());

      // use a map to manipulate data to return the number of childen to the char service
      this.db.object('eventAttendees/SoK6mveajVSH6rKCYYa09XABsqD3/' + this.eventTitle.toLowerCase())
        .snapshotChanges()
        .map(action => {
          const size = action.payload.numChildren();
          return size;
        }).subscribe(newSize => {
        this.chartData.changeSize(newSize);
        this.chartData.changeCheckIns(this.eventTitle.toLowerCase());
        this.isEventSelected = true;                                  // <-- fix
      });
    }
  }

}
