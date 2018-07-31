import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { CleanWS } from './cleanws.service';
import { environment } from './../../../../environments/environment.prod';

const dummydata =
  '<?xml version="1.0" encoding="ISO-8859-1"?><cml xmlns="http://www.chemaxon.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.chemaxon.com/marvin/schema/mrvSchema_16_02_15.xsd" version="ChemAxon file format v16.02.15, generated by v17.3.27.0">';
const rxn = '$RXN 0000bd31044042dbb246e22bd8255a8e -NextMove-1030170124';
describe('CleanWS', () => {
  let service: CleanWS;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CleanWS]
    });

    service = TestBed.get(CleanWS);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should return an Observable with data', () => {
    service.getCleanReaction(rxn).subscribe(data => {
      expect(data).toEqual(dummydata);
    });
    const req = httpMock.expectOne(environment.cleanws);
    expect(req.request.method).toBe('POST');
    req.flush(dummydata);
  });
  it('should return an error', () => {
    service.getCleanReaction(rxn).subscribe(
      data => {},
      err => {
        expect(err.status).toEqual(500, 'status');
      }
    );
    const req = httpMock.expectOne(environment.cleanws);
    const emsg = 'Internal Server Error';
    req.flush(emsg, { status: 500, statusText: 'error' });
  });
});
