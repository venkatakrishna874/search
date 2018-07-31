import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable()
export class GetLabNamesService {
  constructor(private httpClient: HttpClient) {}
  getLabNames() {
    return this.httpClient.get(environment.labNames).pipe(
      map((response: Array<string>) => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
