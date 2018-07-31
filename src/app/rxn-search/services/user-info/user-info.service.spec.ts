import { environment } from './../../../../environments/environment';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { UserInfoService } from './user-info.service';
const dummyData = {
  accessTokenExpiry: 1530207343702,
  accessToken:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3dDIwMTgifQ.eyJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiXSwiY2xpZW50X2lkIjoidjhyN2RmeGgweTF4bndkaCIsImFjY2Vzc19ncmFudCI6IkdVQkVQUDNPeDFoTE5QMjhvNjd2U0RIWW5nTDE5NGVDIiwiaXNzIjoiaHR0cHM6Ly9mZWRlcmF0ZS1xYS54aDEubGlsbHkuY29tIiwianRpIjoiWmM0bWQzMXJPbXRhaFBiMSIsIkNOIjoiQzI0OTE2NyIsInN1YmplY3QiOiJDMjQ5MTY3IiwidXNlclByaW5jaXBhbE5hbWUiOiJrcmlzaG5hX25lbGFwYXRpX3ZlbmthdGFAbmV0d29yay5saWxseS5jb20iLCJleHAiOjE1MzAyMDczNDR9.us-bkGjvqH6qJVNdW4mnfl6BtyD8edqvYM2BWo97Y2QhoMLyPVPsyBEqgCwS5MibAK7gje3kwzIPKmeZKBcsI1CKMcQ4e-emjznizxM_kW1esJtjDfYaTiq7jZM1DJnHQmsgaW1iW5eVWB2iw8eTiRvFh-lEd00J5QVg3DE2xXmeJz_T7ik_5snVjLUHP92rtQzLz5AdhbZ6YjKK3ACwZh07I07LJbw9ei--vCRQeDsR6hrCkIkhqyGzWhsTDbzdZ3VQFhGbQ_DYEsxyR5cfcUuE_pF8aYXzVurO4GEiNQNElWyn6ZHYik2x0avGgyZbK83xe_g5vnkaRxMiTXNPSA'
};

describe('UserInfoService', () => {
  let service: UserInfoService;
  let httpMock: HttpTestingController;
  afterEach(() => {
    httpMock.verify();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserInfoService]
    });
    service = TestBed.get(UserInfoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    service.getUserInfo().then(data => {
      expect(data).toBe(dummyData);
    });
    const request = httpMock.expectOne(environment.userInfo);
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });
});
