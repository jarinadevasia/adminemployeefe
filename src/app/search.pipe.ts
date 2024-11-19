import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  // first argument is the item thatneed to be transformed
  // second argument is,based on which value, the transformation done
  transform(allEmployee: any[], searchKey: string): any[] {
    // console.log('inside pipe');

    const result: any = [];
    if (!allEmployee || searchKey === '') {
      // console.log('employee', allEmployee);
      return allEmployee;


    }
    allEmployee.forEach((item: any) => {
      if (item.username.trim().toLowerCase().includes(searchKey.trim().toLowerCase())) {
        result.push(item)
      }
    })
    return result;
  }

}
