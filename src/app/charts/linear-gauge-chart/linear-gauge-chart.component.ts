import { Component, OnInit } from '@angular/core';
import {single} from './data';
import {ChartDataService} from '../../services/chart-data.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from '../../services/auth.service';


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
  checkins: number;

  colorScheme = {
    domain: ['#0005f3']
  };

  constructor(private chartData: ChartDataService, private db: AngularFireDatabase, private auth: AuthService) {
    this.data = single;
    this.min = 0;
    this.max = 100;
    this.checkins = 0;
  }

  ngOnInit() {
    this.auth.getAuthState().subscribe(() => {

      this.chartData.currentMessage.subscribe(message => {
        this.db.object('eventCounters/' + this.auth.getUserID() + '/' + message)
          .snapshotChanges().subscribe(item => {
          console.log(typeof item.payload.val());
          this.checkins = item.payload.val();
        });
      });

    });

    this.chartData.currentEventSize.subscribe(size => {
      console.log(size);
      this.max = size;
    });
  }

  onSelect(event) {
    console.log(event);
  }

}
