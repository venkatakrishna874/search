import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapToKeys'
})
export class MapToKeysPipe implements PipeTransform {

  transform(value: any, args?: string[]): any {
    const keys: any = [];
    for (const key in value) {
      if (key) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }

}
