import { environment } from '../../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import { RxnsSearchHitCountService } from './rxns-search-hit-count.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

const params = {
  q: '[H]C(N([H])C(=O)N([H])C)C1=CC=CC=C1',
  componentType: 'PRODUCT',
  searchType: 'SUBSTRUCTURE'
};
const filters = {};
const dummyCount: number = 150;

describe('Rxn search hit count service', () => {
  let service: RxnsSearchHitCountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RxnsSearchHitCountService]
    });
    service = TestBed.get(RxnsSearchHitCountService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should get count from service ', () => {
    service.getHitCount(params, filters).subscribe(data => {
      expect(typeof data).toBe('number');
    });
    const request = httpMock.expectOne(environment.rxnsSearchHitCount);
    expect(request.request.method).toBe('POST');
    request.flush(dummyCount);
  });
  it('should return an error', () => {
    service.getHitCount(params, filters).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const request = httpMock.expectOne(environment.rxnsSearchHitCount);
    const emsg = 'deliberate 404 error';
    request.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
