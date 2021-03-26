import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@core';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(title: Title) {
    title.setTitle('Dummy UI');

    console.log(
      '%c+',
      // eslint-disable-next-line max-len
      'font-size: 1px; padding: 180px 320px; line-height: 180px; background: url(https://media.giphy.com/media/RIMLWdCvQ1fcUlg7i1/giphy.gif) no-repeat; color: transparent;'
    );
  }
}
