import { NgModule } from '@angular/core';
import { APP_CONSTANTS } from '@core';
import { CONSTANTS } from './constants';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [{ provide: APP_CONSTANTS, useValue: CONSTANTS }]
})
export class CoreModule {}
