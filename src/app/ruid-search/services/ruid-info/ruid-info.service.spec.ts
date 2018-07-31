import { TestBed, getTestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { environment } from '../../../../environments/environment';
import { RuidInfoService } from './ruid-info.service';

const ruid = '0000bd31044042dbb246e22bd8255a8e';
const dummydata = {
  returnValue: {
    columnNames: [
      'REACTION_DID',
      'NOTEBOOK_PAGE_DID',
      'SOURCE',
      'INVESTIGATOR',
      'RXN_STRING',
      'EXPERIMENT_NAME',
      'APL_YIELD',
      'PRODUCT_1_NAME',
      'PRODUCT_1_PERCENT_YIELD',
      'PRODUCT_2_NAME',
      'PRODUCT_2_PERCENT_YIELD',
      'PRODUCT_3_NAME',
      'PRODUCT_3_PERCENT_YIELD',
      'PROCEDURE',
      'AUTO_LAB',
      'AUTO_PLATFORM',
      'OPSL',
      'OPSL_ID',
      'ASL',
      'ASL_ID'
    ],
    columnLabels: [
      'REACTION_DID',
      'NOTEBOOK_PAGE_DID',
      'SOURCE',
      'INVESTIGATOR',
      'RXN_STRING',
      'EXPERIMENT_NAME',
      'APL_YIELD',
      'PRODUCT_1_NAME',
      'PRODUCT_1_PERCENT_YIELD',
      'PRODUCT_2_NAME',
      'PRODUCT_2_PERCENT_YIELD',
      'PRODUCT_3_NAME',
      'PRODUCT_3_PERCENT_YIELD',
      'PROCEDURE',
      'AUTO_LAB',
      'AUTO_PLATFORM',
      'OPSL',
      'OPSL_ID',
      'ASL',
      'ASL_ID'
    ],
    columnDataTypes: [
      'String',
      'String',
      'String',
      'String',
      'String',
      'String',
      'Double',
      'String',
      'Double',
      'String',
      'Double',
      'String',
      'Double',
      'String',
      'Double',
      'String',
      'Double',
      'Double',
      'Double',
      'String'
    ],
    rows: [
      {
        data: [
          '00002cf9c74c48d2add8b5e558dfe9f4',
          'Document.00002cf9-c74c-48d2-add8-b5e558dfe9f4',
          'Internal',
          'Walton Lesley',
          '$RXN\n00002cf9c74c48d2add8b5e558dfe9f4\n',
          0,
          '#NULL#',
          '#NULL#',
          '#NULL#',
          '#NULL#',
          '#NULL#'
        ]
      }
    ],
    truncated: false
  },
  isSuccess: true,
  executionLog: '',
  errorLog: '',
  jobDirectory: '',
  size: 14144,
  cacheHit: false
};

describe('RuidInfoService', () => {
  let service: RuidInfoService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RuidInfoService]
    });

    service = TestBed.get(RuidInfoService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should return an Observable with data', () => {
    service.getDetails(ruid).subscribe(data => {
      expect(data).toEqual(dummydata);
    });
    const req = httpMock.expectOne(environment.getRuidInfo);
    expect(req.request.method).toBe('POST');
    req.flush(dummydata);
  });
  it('should return an error', () => {
    const ruids =
      '0000bd31044042dbb246e22bd8255a8e, 0000bd31044042dbb246e22bd8255a8e';
    service.getDetails(ruids).subscribe(
      data => {},
      err => {
        expect(err.status).toEqual(500, 'status');
      }
    );
    const req = httpMock.expectOne(environment.getRuidInfo);
    const emsg = 'Internal Server Error';
    req.flush(emsg, { status: 500, statusText: 'error' });
  });
});
