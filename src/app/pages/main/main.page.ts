import { Component, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const SUBMITTED_DATA = new InjectionToken<BehaviorSubject<any>>(
  'Data submitted by user profile form.'
);
@Component({
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.css'],
  providers: [
    { provide: SUBMITTED_DATA, useFactory: () => new BehaviorSubject(null) }
  ]
})
export class MainPage {
  constructor() {}
}
