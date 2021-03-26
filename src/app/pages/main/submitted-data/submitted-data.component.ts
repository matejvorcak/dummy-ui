import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Optional
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SUBMITTED_DATA } from '../main.page';

@Component({
  selector: 'app-submitted-data',
  templateUrl: './submitted-data.component.html',
  styleUrls: ['./submitted-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmittedDataComponent {
  constructor(
    @Optional()
    @Inject(SUBMITTED_DATA)
    private submittedData$: BehaviorSubject<any>
  ) {}

  get data$(): Observable<any> {
    return this.submittedData$.pipe(
      map(data => {
        if (!!data) {
          const { name, email, mobile_phone } = data;
          return { name, email, mobile_phone };
        } else {
          return null;
        }
      })
    );
  }
}
