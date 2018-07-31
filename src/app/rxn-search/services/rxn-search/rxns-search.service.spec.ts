import { TestBed, getTestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { RxnsSearchService } from './rxns-search.service';
import { environment } from '../../../../environments/environment';
import { Params } from '@angular/router';

const dummydata = [
  {
    ruid: '02b01f46288b4f71950d03856bc8f173',
    rxnString: 'Cl.NCCC1(C(F)(F)F)CC1.NCC1=CC=CC(NC'
  },
  {
    ruid: '02b01f46288b4f71950d03856bc8f173',
    rxnString: 'Cl.NCCC1(C(F)(F)F)CC1.NCC1=CC=CC(NC'
  }
];
const offset: number = 0;
const params: Params = {
  query: '>>[H]C(N([H])C(=O)N([H])C)C1=CC=CC=C1',
  searchType: 'SUBSTRUCTURE'
};
const perPage: number = 10;
const filters = {};
describe('RxnsSearchService', () => {
  let injector;
  let service: RxnsSearchService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RxnsSearchService]
    });

    injector = getTestBed();
    service = injector.get(RxnsSearchService);
    httpMock = injector.get(HttpTestingController);
  });
  it('should return an Observable with data', () => {
    service.getReactions(params, offset, perPage, filters).subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummydata);
    });
    const req = httpMock.expectOne(environment.rxnsSearch);
    expect(req.request.method).toBe('POST');
    req.flush(dummydata);
  });
  it('should return an error', () => {
    service.getReactions(params, offset, perPage, filters).subscribe(
      data => {},
      err => {
        expect(err.status).toEqual(500, 'status');
      }
    );
    const req = httpMock.expectOne(environment.rxnsSearch);
    const emsg = 'Internal Server Error';
    req.flush(emsg, { status: 500, statusText: 'error' });
  });
});
