import { environment } from './../../../../environments/environment.prod';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { NotebookPageAutoCompleteService } from './notebookpage-auto-complete.service';
const query: string = '[H]C(N([H])C(=O)N([H])C)C1=CC=CC=C1';
const offset: number = 0;
const maxResults: number = 9;
const url = `${
  environment.notebookPages
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
describe('NotebookpageAutoCompleteService', () => {
  let service: NotebookPageAutoCompleteService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotebookPageAutoCompleteService]
    });
    service = TestBed.get(NotebookPageAutoCompleteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created and return data', () => {
    expect(service).toBeTruthy();
    service
      .retrieveNoteBookPageNames(query, offset, maxResults)
      .subscribe(data => {
        expect(data).toBe(dummyData);
      });
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
