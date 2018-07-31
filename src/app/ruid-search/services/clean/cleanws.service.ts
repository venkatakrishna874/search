import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CleanWS {
  returnData: any;
  constructor(private handler: HttpBackend, private httpClient: HttpClient) {
    this.httpClient = new HttpClient(handler);
  }
  getCleanReaction(rxn): Observable<any> {
    const body = {
      structure: rxn,
      parameters: {
        dim: 2
      }
    };
    return this.httpClient
      .post(environment.cleanws, JSON.stringify(body), {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
