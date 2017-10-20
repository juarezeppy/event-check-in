import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ChartDataService {

  private messageSource = new BehaviorSubject<string>('movie');
  private eventSize = new BehaviorSubject<number>(100);
  currentMessage = this.messageSource.asObservable();
  currentEventSize = this.eventSize.asObservable();


  constructor() { }

  changeCheckIns(checkIns: string) {
    this.messageSource.next(checkIns);
  }

  changeSize(size: number) {
    this.eventSize.next(size);
  }
}
