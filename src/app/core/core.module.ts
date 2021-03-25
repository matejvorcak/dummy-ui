import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONSTANTS } from '@core';
import { CONSTANTS } from './constants';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: APP_CONSTANTS, useValue: CONSTANTS }]
})
export class CoreModule {}
