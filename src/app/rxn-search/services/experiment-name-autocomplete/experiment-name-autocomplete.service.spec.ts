import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ExperimentNameAutocompleteService } from './experiment-name-autocomplete.service';
import { environment } from '../../../../environments/environment';

const query: string = '[H]C(N([H])C(=O)N([H])C)C1=CC=CC=C1';
const offset: number = 0;
const maxResults: number = 9;
const url = `${
  environment.experimentNames
}?q=${query}&offset=${offset}&max_results=${maxResults}`;
const dummyData = [
  'MX5-E00382-001',
  'MX5-E00382-002',
  'MX5-E00382-003',
  'MX5-E00382-004',
  'MX5-E00382-005',
  'MX5-E00382-006',
  'MX5-E00382-007',
  'MX5-E00382-008',
  'MX5-E00382-009'
];
describe('ExperimentNameAutocompleteService', () => {
  let service: ExperimentNameAutocompleteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExperimentNameAutocompleteService]
    });
    service = TestBed.get(ExperimentNameAutocompleteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    service.retrieveExpNames(query, offset, maxResults).subscribe(data => {
      expect(data).toBe(dummyData);
    });

    const request = httpMock.expectOne(req => req.method === 'GET');
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });
  it('should return an error', () => {
    service.retrieveExpNames(query, offset, maxResults).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const request = httpMock.expectOne(req => req.method === 'GET');
    const emsg = 'deliberate 404 error';
    request.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
