import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  form = new FormGroup({
    formEventName: new FormControl('' , [
      Validators.required
    ]),
    formEventLocation: new FormControl('', [
      Validators.required
    ]),
    formAttendees: new FormControl('', [
      Validators.required
    ]),
    formDateTime: new FormControl('', [
      Validators.required
    ])
  });

  constructor() {}

  ngOnInit() {
  }

  // use all lower case for native validators!!!!
  // example minlength NOT minLength
  get formEventName() {
    return this.form.get('formEventName');
  }

  get formEventLocation() {
    return this.form.get('formEventLocation');
  }

  get formAttendees() {
    return this.form.get('formAttendees');
  }

  get formDateTime() {
    return this.form.get('formDateTime');
  }

  createEvent() {
    console.log(this.formEventName.value, this.formEventLocation.value, this.formAttendees.value, this.formDateTime.value);
  }
}

