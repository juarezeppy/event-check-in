import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
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
  eventChoices: Observable<any[]>;
  counter: number;
  isEventSelected: boolean;


  itemsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private eventService: EventsService,
              private authService: AuthService, private chartData: ChartDataService) {
    this.eventTitle = 'Select An Event';
    this.counter = 0;
    this.isEventSelected = false;
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe(() => {
      this.eventChoices = this.eventService.getEvents();

      this.itemsRef = this.db.list('events/SoK6mveajVSH6rKCYYa09XABsqD3/');
      this.itemsRef.snapshotChanges(['child_added'])
        .subscribe(actions => {
          actions.forEach(action => {
            console.log(action.type);
            console.log(action.key);
            console.log(action.payload.val(), action.payload.val().checkedIn);
          });
        });
    });
  }

  changeEvent(selectedValue) {
    console.log('getting event:', selectedValue.value);

    if (this.eventTitle !== '') {
      this.eventTitle = selectedValue.value;
      this.attendees = this.eventService.getEventData(this.eventTitle.toLowerCase());
      this.isEventSelected = true;                                  // <-- fix

      // use a map to manipulate data to return the number of childen to the chart service
      this.attendees
        .map(action => {
          return action.length;
        })
        .subscribe(newSize => {
          this.chartData.changeSize(newSize);
          this.chartData.changeCheckIns(this.eventTitle.toLowerCase());
        });
      }
    }
}
