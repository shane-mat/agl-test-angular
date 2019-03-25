import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortListBy'
})
export class SortListPipe implements PipeTransform {

  transform(items: any, soryBy: string) {

    if (!items || !Array.isArray(items)) {
      return;
    }
    items.sort((a: any, b: any) => {
      if (a[soryBy] < b[soryBy]) {
        return -1;
      } 
      else if (a[soryBy] > b[soryBy]) {
        return 1;
      } 
      else {
        return 0;
      }
    });
    return items;
  }
}
