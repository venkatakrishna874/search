import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from './../../../../environments/environment.prod';
import { GetLabNamesService } from './get-lab-names.service';

const dummyData = ['Chemists', 'ASL', 'OPSL'];
describe('GetLabNamesService', () => {
  let service: GetLabNamesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetLabNamesService]
    });
    service = TestBed.get(GetLabNamesService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and return data', () => {
    service.getLabNames().subscribe(data => {
      expect(data).toBe(dummyData);
    });
    expect(service).toBeTruthy();
    const request = httpMock.expectOne(
      req => req.method === 'GET' && req.url === environment.labNames
    );
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });
  it('should return an error', () => {
    service.getLabNames().subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const request = httpMock.expectOne(
      req => req.method === 'GET' && req.url === environment.labNames
    );
    const emsg = 'deliberate 404 error';
    request.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
