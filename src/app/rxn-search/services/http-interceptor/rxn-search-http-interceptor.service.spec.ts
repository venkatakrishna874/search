// import { RxnSearchHttpInterceptor } from './rxn-search-http-interceptor.service';
// import { SharedModule } from './../../../shared/shared.module';
// import { ErrorComponent } from '../../../shared/errors-component/errors.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import {
//   HttpClientTestingModule,
//   HttpTestingController
// } from '@angular/common/http/testing';
// import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

// import { environment } from '../../../../environments/environment';
// import { RxnsSearchService } from '../rxn-search/rxns-search.service';
// import { UserInfoService } from '../user-info/user-info.service';

// const userInfodata = {
//   accessTokenExpiry: 1530218000927,
//   accessToken:
//     'eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3dDIwMTgifQ.eyJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiXSwiY2xpZW50X2lkIjoidjhyN2RmeGgweTF4bndkaCIsImFjY2Vzc19ncmFudCI6InR1RHAwdkV3N0ViQlpHRkd4SzZYeE1KRWVobFkwak41IiwiaXNzIjoiaHR0cHM6Ly9mZWRlcmF0ZS1xYS54aDEubGlsbHkuY29tIiwianRpIjoiWUtUdVRQVVdDajhmcHJDdyIsIkNOIjoiQzI0OTE2NyIsInN1YmplY3QiOiJDMjQ5MTY3IiwidXNlclByaW5jaXBhbE5hbWUiOiJrcmlzaG5hX25lbGFwYXRpX3ZlbmthdGFAbmV0d29yay5saWxseS5jb20iLCJleHAiOjE1MzAyMTgwMDF9.JRVtqSou4hDEWghmjDlOcJ6QWyrwl5wHJ81OiT1yLfiWPiema-0DNTMOh30c7UInkSVk0cmh-VDRYJe3a-ypLNJNFVTs2YjRc8FBdpTBMRqfphuUa7IZD0H0G60DizOf0tsQnBkm5K2DB8oEx3hZJV4SLXc9wEncsI758lPNT6R_rcL4jV1w-iaMmK6zzeLusdqS3FiApADXwyqgF1H2X3O91mxjJWkaV0W237LppnS9Ouyhj8ORPtJv6ci_TryQa5_AcA7wtmPcWro7QuPA_5INLXQzV8_AFnQqyGzzu1JDhtexIF4Hfk6BaFfRDcN-n0Zyyj0LmyD6itOUvgoupQ'
// };

// const dummydata = [
//   {
//     ruid: '02b01f46288b4f71950d03856bc8f173',
//     rxnString: 'Cl.NCCC1(C(F)(F)F)CC1.NCC1=CC=CC(NC'
//   },
//   {
//     ruid: '02b01f46288b4f71950d03856bc8f173',
//     rxnString: 'Cl.NCCC1(C(F)(F)F)CC1.NCC1=CC=CC(NC'
//   }
// ];
// const params = {
//   query: '[H]C(N([H])C(=O)N([H])C)C1=CC=CC=C1',
//   searchType: 'SUBSTRUCTURE'
// };
// const offset: number = 0;
// const perPage: number = 10;
// const filters = {};
// describe('Http interceptor/RxnSearchService', () => {
//   let httpMock: HttpTestingController;
//   let service: RxnsSearchService;
//   let userInfo: UserInfoService;
//   afterEach(() => {
//     httpMock.verify();
//   });
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [SharedModule, HttpClientTestingModule, BrowserAnimationsModule],
//       providers: [
//         RxnsSearchService,
//         UserInfoService,
//         {
//           provide: HTTP_INTERCEPTORS,
//           useClass: RxnSearchHttpInterceptor,
//           multi: true
//         }
//       ],
//       declarations: [ErrorComponent]
//     });
//     TestBed.overrideModule(BrowserDynamicTestingModule, {
//       set: {
//         entryComponents: [ErrorComponent]
//       }
//     });
//     httpMock = TestBed.get(HttpTestingController);
//     service = TestBed.get(RxnsSearchService);
//     userInfo = TestBed.get(UserInfoService);
//     spyOn(userInfo, 'getUserInfo').and.returnValue(userInfodata);
//   });
//   it('should add Content-Type header', () => {
//     service
//       .getReactions(params, perPage, offset, filters)
//       .subscribe(response => {
//         expect(response).toBe(dummydata);
//       });
//     const httpRequest = httpMock.expectOne(environment.rxnsSearch);
//     expect(httpRequest.request.headers.get('Content-Type')).toBe(
//       'application/json;charset=UTF-8'
//     );
//     httpRequest.flush(dummydata);
//   });
//   it('should return error with error code 403', () => {
//     service.getReactions(params, perPage, offset, filters).subscribe(
//       () => {},
//       error => {
//         expect(error.status).toEqual(403, 'status');
//       }
//     );
//     const httpRequest = httpMock.expectOne(
//       req => req.method === 'POST' && req.url === environment.rxnsSearch
//     );
//     const emsg = 'Something happened wrong';
//     httpRequest.flush(emsg, { status: 403, statusText: '' });
//   });
//   it('should return error with error code 401', () => {
//     service.getReactions(params, perPage, offset, filters).subscribe(
//       () => {},
//       error => {
//         expect(error).toBeTruthy();
//         expect(error.status).toEqual(401, 'status');
//       }
//     );
//     const httpRequest = httpMock.expectOne(environment.rxnsSearch);
//     const emsg = 'Something happened wrong';
//     httpRequest.flush(emsg, { status: 401, statusText: '' });
//   });
//   it('should return error with error code 410', () => {
//     service.getReactions(params, perPage, offset, filters).subscribe(
//       () => {},
//       error => {
//         expect(error).toBeTruthy();
//         expect(error.status).toEqual(410, 'status');
//       }
//     );
//     const httpRequest = httpMock.expectOne(environment.rxnsSearch);
//     const emsg = 'Something happened wrong';
//     httpRequest.flush(emsg, { status: 410, statusText: '' });
//   });
//   it('should return error with error code 409', () => {
//     service.getReactions(params, perPage, offset, filters).subscribe(
//       () => {},
//       error => {
//         expect(error).toBeTruthy();
//         expect(error.status).toEqual(409, 'status');
//       }
//     );
//     const httpRequest = httpMock.expectOne(environment.rxnsSearch);
//     const emsg = 'Something happened wrong';
//     httpRequest.flush(emsg, { status: 409, statusText: '' });
//   });
//   it('should return error with error code zero', () => {
//     service.getReactions(params, perPage, offset, filters).subscribe(
//       () => {},
//       error => {
//         expect(error).toBeTruthy();
//         expect(error.status).toEqual(0, 'status');
//       }
//     );
//     const httpRequest = httpMock.expectOne(environment.rxnsSearch);
//     const emsg = 'Something happened wrong';
//     httpRequest.flush(emsg, { status: 0, statusText: '' });
//   });
// });
