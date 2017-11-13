import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {geoAPI} from '../../../keys/geoAPI';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  lat: number;
  lng: number;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getUserLocation();
    const body = {
      'homeMobileCountryCode': 310,
      'homeMobileNetworkCode': 410,
      'radioType': 'gsm',
      'carrier': 'Vodafone',
      'considerIp': 'true',
      'cellTowers': [
        // See the Cell Tower Objects section below.
      ],
      'wifiAccessPoints': [
        // See the WiFi Access Point Objects section below.
      ]
    };
    this.http.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${geoAPI}`, body).subscribe(val => {
      console.log(val.json());
      this.lat = val.json().location.lat;
      this.lng = val.json().location.lng;
    });
  }

  private getUserLocation() {
    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

    } else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }
  }
}
