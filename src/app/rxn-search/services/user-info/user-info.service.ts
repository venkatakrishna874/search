import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(private handler: HttpBackend, private httpClient: HttpClient) {
    this.httpClient = new HttpClient(handler);
  }
  async getUserInfo(): Promise<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Accept', 'application/json');
    const response = await this.httpClient
      .get(environment.userInfo, { headers: headers })
      .pipe(
        tap(data => {
          sessionStorage .setItem('access_token', data['access_token']);
          sessionStorage .setItem('expires_in', data['expires_in']);
          sessionStorage .setItem('refresh_token', data['refresh_token']);
          sessionStorage .setItem('refresh_token_expiry', data['refresh_token_expiry']);
        }),
        catchError(error => {
          return throwError(error);
        })
      )
      .toPromise();
    return response;
  }
}
