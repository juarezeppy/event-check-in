import { Component, OnInit } from '@angular/core';
import {EventsService} from '../services/events.service';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {ChartDataService} from '../services/chart-data.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  eventTitle: string;
  attendees: Observable<any[]>;
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
