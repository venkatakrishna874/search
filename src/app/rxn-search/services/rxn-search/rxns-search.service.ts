import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RxnsSearchService {
  constructor(private httpClient: HttpClient) {}

  getReactions(params: Params, offset: number, perPage: number, filters: any) {
    const body = {
      filters: filters,
      maxResults: perPage,
      offset: offset,
      query: params.query,
      searchType: params.searchType
    };
    console.log(body);
    return this.httpClient.post(environment.rxnsSearch, body).pipe(
      map((response: Array<any>) => {
        return response;
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
