import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformFilterTag'
})
export class TransformFilterTagPipe implements PipeTransform {

  transform(value: string): string {

    return this.transformKeyName(value);
  }
  private transformKeyName(key: string): string {
    switch (key) {
      case 'vaultNames':
        return 'Vault Names ';
      case 'labNames':
        return 'Lab Names ';
      case 'minYield':
        return 'Min Yield ';
      case 'maxYield':
        return 'Max Yield ';
      case 'endDate':
        return 'End Date';
      case 'startDate':
        return 'Start Date ';
      case 'experimentName':
        return 'Experiment Name ';
      case 'notebookPage':
        return 'Notebook Page ';
      default:
        return key;
    }
  }

}
