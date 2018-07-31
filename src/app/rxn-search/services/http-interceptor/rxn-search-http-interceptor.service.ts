import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';

import { RefreshTokenService } from './../refresh-token/refresh-token.service';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable()
export class RxnSearchHttpInterceptor implements HttpInterceptor {
  constructor(
    private dialog: MatDialog,
    private userInfoService: UserInfoService,
    private refreshToken: RefreshTokenService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }
  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    let token = sessionStorage.getItem('access_token');
    let accessTokenExpiry = sessionStorage.getItem('expires_in');
    if (token === null) {
      const userInfo = await this.userInfoService.getUserInfo().catch(err => {
        if (err.status === 0) {
          window.location.reload();
        }
        console.log(`Error came from user info service: ${err.status}`);
      });
      token = userInfo['access_token'];
      accessTokenExpiry = userInfo['expires_in'];
    } else if (token !== null && this.isTokenExperied(accessTokenExpiry)) {
      const refToken = sessionStorage.getItem('refresh_token');
      const userInfo = await this.refreshToken.getNewAccessToken(refToken).catch(err => {
        console.log(`Error came from refresh token info service: ${err.status}`);
      });
      token = userInfo['access_token'];
      accessTokenExpiry = userInfo['expires_in'];
    }
    console.log(`isTokenExperied: ${this.isTokenExperied(accessTokenExpiry)}`);
    let changedRequest = request;
    const headers: { [name: string]: string | string[] } = {};
    headers['Content-Type'] = 'application/json;charset=UTF-8';
    headers['Accept'] = 'application/json';
    headers['Authorization'] = `Bearer ${token}`;
    const newHeaders = new HttpHeaders(headers);
    changedRequest = request.clone({
      headers: newHeaders
    });
    return next
      .handle(changedRequest)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            if (!localStorage.justOnce) {
              localStorage.setItem('justOnce', 'true');
              window.location.reload();
            }
          }
          // this.dialog.open(ErrorComponent, {
          //   width: 'calc(48vw)',
          //   height: 'calc(44vh)',
          //   disableClose: true,
          //   hasBackdrop: true,
          //   data: this.errorMessage(err.status)
          // });
          return throwError(err);
        })
      )
      .toPromise();
  }
  isTokenExperied(time: any): boolean {
    return +time < new Date().valueOf();
  }
  // private errorMessage(type: number) {
  //   const dialog: any = {};
  //   dialog.headertext = 'Sorry';

  //   switch (type) {
  //     case 400:
  //     case 500:
  //       dialog.bodytext1 =
  //         'Something happened wrong and we could not fulfill this request.';
  //       dialog.bodytext2 = '';
  //       break;
  //     case 401:
  //       dialog.bodytext1 =
  //         'Invalid credentials or not able to authenticate properly , the page can’t be accessed.';
  //       dialog.bodytext2 = 'Please check and try again.';
  //       break;
  //     case 403:
  //       dialog.bodytext1 =
  //         'This page no longer exists or it may have moved to a new address.';
  //       dialog.bodytext2 = 'Please check the address and try again.';
  //       console.log('403 error');
  //       break;
  //     case 404:
  //       dialog.bodytext1 = 'This page is not responding.';
  //       dialog.bodytext2 = 'Please check the address and try again.';
  //       break;
  //     case 410:
  //       dialog.bodytext1 = 'An error occurred';
  //       dialog.bodytext2 = 'Please check the address and try again.';
  //       break;
  //     case 409:
  //       dialog.bodytext1 = 'User reached the limit to perform this action.';
  //       dialog.bodytext2 = '';
  //       break;
  //     default:
  //       dialog.bodytext1 = 'There has been an error. Please try again later.';
  //       dialog.bodytext2 = '';
  //       break;
  //   }
  //   return dialog;
  // }
}
