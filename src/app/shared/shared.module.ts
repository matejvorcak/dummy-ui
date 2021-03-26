import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackByPropertyPipe } from './track-by-property.pipe';

@NgModule({
  declarations: [TrackByPropertyPipe],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TrackByPropertyPipe
  ]
})
export class SharedModule {}
