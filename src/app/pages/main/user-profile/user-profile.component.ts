import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '@core/services';
import { concat, forkJoin } from 'rxjs';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  dataStatus: 'LOADING' | 'LOADED' | 'ERROR' = 'LOADING';
  foos: any;

  constructor(private profileService: UserProfileService) {}

  /** load foos */
  ngOnInit(): void {
    concat(
      this.profileService.loadFoo(1),
      this.profileService.loadFoo(2),
      this.profileService.loadFoo(3)
    )
      .pipe(reduce((acc, value) => [...acc, value], []))
      .subscribe(
        foos => {
          this.foos = foos;
          this.dataStatus = 'LOADED';
        },
        error => {
          this.dataStatus = 'ERROR';
        }
      );

    // bonus
    // forkJoin({
    //   foo1: this.profileService.loadFoo(1),
    //   foo2: this.profileService.loadFoo(2),
    //   foo3: this.profileService.loadFoo(3)
    // }).subscribe(
    //   success => {
    //     this.dataStatus = 'LOADED';
    //   },
    //   error => {
    //     this.dataStatus = 'ERROR';
    //   }
    // );
  }
}
