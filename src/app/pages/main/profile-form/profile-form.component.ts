import {
  AfterViewInit,
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  Optional
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISubmitDataInput, UserProfileService } from '@core/services';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SUBMITTED_DATA } from '../main.page';

const WHITE = '#ffffff';
const NONE = 'none';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements AfterViewInit, OnDestroy {
  @HostBinding('style.background') customBgColor = NONE;

  formSubmitted = false;
  profileForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile_phone: [
      '',
      [
        Validators.pattern(
          // eslint-disable-next-line @typescript-eslint/naming-convention, max-len
          /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
        )
      ]
    ],
    customBgColor: [WHITE]
  });

  submitState: 'success' | 'error' | 'none' = 'none';

  private subsciptions$: Subscription;
  private submits = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UserProfileService,
    @Optional()
    @Inject(SUBMITTED_DATA)
    private submittedData$: BehaviorSubject<any>
  ) {}

  /** Subscribe profile form submit */
  ngAfterViewInit(): void {
    this.subsciptions$ = new Subscription();
    this.subsciptions$.add(
      this.submits
        .pipe(
          switchMap(() => {
            const data: ISubmitDataInput = {
              email: this.profileForm.value.email,
              name: this.profileForm.value.name
            };
            if (!!this.profileForm.value.mobile_phone) {
              data.mobile_phone = this.profileForm.value.mobile_phone;
            }
            return this.userService
              .submitData(data)
              .pipe(catchError(errors => of({ errors })));
          })
        )
        .subscribe(response => {
          if (response.errors) {
            this.submitState = 'error';
          } else {
            this.submitState = 'success';
            this.submittedData$?.next(this.profileForm.value);
          }
        })
    );
  }

  /** Clear all subsciptions */
  ngOnDestroy(): void {
    this.subsciptions$?.unsubscribe();
  }

  /** Process profile form */
  onSubmit(): void {
    this.customBgColor = this.profileForm.value.customBgColor;
    this.profileForm.markAllAsTouched();
    this.formSubmitted = true;
    if (this.profileForm.valid) {
      this.submits.next();
    }
  }

  /** reset form state and reset submitted flag to false */
  resetForm(): void {
    this.profileForm.reset();
    this.formSubmitted = false;
    this.customBgColor = WHITE;
    this.submittedData$.next(null);
  }
}
