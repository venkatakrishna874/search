import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  constructor(private httpClient: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }
  async getNewAccessToken(refreshToken: string): Promise<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const body = {
      refToken: refreshToken
    };
    const httpOptions = {
      headers: headers
    };
    const response = await this.httpClient
      .post(environment.userInfo, body, httpOptions)
      .pipe(
        tap((data: any) => {
          sessionStorage.setItem('access_token', data['access_token']);
          sessionStorage.setItem('expires_in', data['expires_in']);
          sessionStorage.setItem('refresh_token', data['refresh_token']);
        }),
        catchError(error => {
          return throwError(error);
        })
      )
      .toPromise();
    return response;
  }
}
