import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class YieldsService {
  constructor(private httpClient: HttpClient) {}
  getYields(ruids: Array<string>) {
    const body = ruids;
    return this.httpClient.post(environment.yields, body).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
