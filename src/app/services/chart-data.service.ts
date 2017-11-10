import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ChartDataService {

  private messageSource = new BehaviorSubject<string>('null');
  private eventSize = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();
  currentEventSize = this.eventSize.asObservable();


  constructor() { }

  changeCheckIns(checkIns: string) {
    console.log(checkIns);
    this.messageSource.next(checkIns);
  }

  changeSize(size: number) {
    console.log(size);
    this.eventSize.next(size);
  }
}
