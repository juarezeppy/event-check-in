import { Component, OnInit } from '@angular/core';
import {ChartDataService} from '../../services/chart-data.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {EventsService} from '../../services/events.service';


@Component({
  selector: 'app-linear-gauge-chart',
  templateUrl: './linear-gauge-chart.component.html',
  styleUrls: ['./linear-gauge-chart.component.css']
})
export class LinearGaugeChartComponent implements OnInit {
  // create a two way binding service to get chart data from

  data: any[];
  min: number;
  max: number;
  checkInObservable: Observable<any>;
  checkins: number;


  colorScheme = {
    domain: ['#0005f3']
  };

  constructor(private chartData: ChartDataService, private events: EventsService) {
    this.min = 0;
    this.max = 100;
    this.checkins = 0;
  }

  ngOnInit() {
    // Get the current event name/path from the service
    this.chartData.currentMessage.subscribe(message => {
      this.checkInObservable = this.events.getCheckIns(message);
    });

    // Using the current event name/path grab the current number of check-ins for the chart
    this.checkInObservable.subscribe( val => {
      this.checkins = val;
    });

    // Subscribe to the current events max for the chart
    this.chartData.currentEventSize.subscribe(size => {
      this.max = size;
    });
  }

  onSelect(event) {
    console.log(event);
  }

}
