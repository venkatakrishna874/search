import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from './../../../../environments/environment.prod';
import { GetVaultNamesService } from './get-vault-names.service';

const dummyData = ['DCRTZ1', 'JUB', 'PSRDZ2', 'DCRTZ2', 'AMRI'];
describe('GetVaultNamesService', () => {
  let service: GetVaultNamesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetVaultNamesService]
    });
    service = TestBed.get(GetVaultNamesService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and return data', () => {
    service.getVaultNames().subscribe(data => {
      expect(data).toBe(dummyData);
    });
    expect(service).toBeTruthy();
    const request = httpMock.expectOne(
      req => req.method === 'GET' && req.url === environment.getVaultNames
    );
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });
  it('should return an error', () => {
    service.getVaultNames().subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const request = httpMock.expectOne(
      req => req.method === 'GET' && req.url === environment.getVaultNames
    );
    const emsg = 'deliberate 404 error';
    request.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
