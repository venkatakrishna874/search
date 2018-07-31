import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RuidInfoService {
  constructor(private httpClient: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  getDetails(ruid) {
    const headers = new HttpHeaders();
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
      .post(environment.getRuidInfo, body, httpOptions)
      .pipe(
        map(response => {
          const data = response;
          return data;
        })
      );
  }
}
