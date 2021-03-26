import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackByProperty',
  pure: true
})
export class TrackByPropertyPipe implements PipeTransform {
  /** retuns track by function by item property */
  transform(property: string): (index: number, item: any) => string | number {
    if (property === '$index' || !property) {
      return (index, item) => index;
    } else {
      return (index, item) => item[property];
    }
  }
}
