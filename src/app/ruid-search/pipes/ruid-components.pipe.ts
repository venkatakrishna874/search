import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ruidComponents',
})
export class RuidComponentsPipe implements PipeTransform {

    transform(data: any[], ruid): any[] {
        if (data !== undefined) {
            const result = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].ruid === ruid) {
                    result.push(data[i]);
                }
            }
            return result;
        } else {
            return data;
        }
    }
}
