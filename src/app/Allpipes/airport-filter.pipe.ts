import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform { 

  transform(items: any[], searchText: string): any[] {
    console.log(items)
    if (!items) {
      console.log(items)
      return [];
    }
    if (!searchText) {
      console.log(items)
      return items;
      
    }
    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return it.code.toLowerCase().includes(searchText) || it.city.toLowerCase().includes(searchText);
    });
  }

}
