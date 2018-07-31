import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoichiometryTableInfoService {
  constructor(private httpClient: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  getInfo(ruid) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json').set('Accept', 'text/plain');
    const httpOptions = {
      withCredentials: true,
      headers: headers
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
    };

    let body: string;
    const k = ruid.split(',');

    for (let i = 0; i < k.length; i++) {
      if (i > 0) {
        body += '&ruid=' + k[i].trim();
      } else {
        body = 'ruid=' + k[i].trim();
      }
    }

    return this.httpClient
      .post(environment.stoichiometryTableInfo, body, httpOptions)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
