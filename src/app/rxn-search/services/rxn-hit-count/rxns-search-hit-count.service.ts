import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RxnsSearchHitCountService {
  constructor(private httpClient: HttpClient) {}

  getHitCount(params: Params, filters: any) {
    const body = {
      filters: filters,
      query: params.query,
      searchType: params.searchType
    };
    return this.httpClient.post(environment.rxnsSearchHitCount, body).pipe(
      map((response: number) => {
        return response;
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
