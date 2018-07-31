import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapYieldToRuid'
})
export class MapYieldToRuidPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    if (value !== undefined) {
      for (const rxn of value) {
        if (rxn.ruid === args) {
          if (rxn.yield) {
            return `${rxn.yield}%`;
          } else {
            return '--';
          }
        }
      }
    }
  }

}
