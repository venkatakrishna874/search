import { environment } from './../../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { StoichiometryTableInfoService } from './stoichiometry-table-info';

const ruid = '0000bd31044042dbb246e22bd8255a8e';
const dummydata = {
  returnValue: {
    columnNames: [
      'REACTION_DID',
      'NAME',
      'COMPONENT_TYPE',
      'SMILES',
      'EQUIVALENTS',
      'CAS',
      'DENSITY_VALUE',
      'DENSITY_UNITS',
      'ACTUAL_AMOUNT_VALUE',
      'ACTUAL_AMOUNT_UNITS',
      'MOLECULAR_WEIGHT_VALUE',
      'STRENGTH_VALUE',
      'STRENGTH_UNITS',
      'DILUENT',
      'LOT_NUMBER',
      'MASS_VALUE',
      'MASS_UNITS',
      'VOLUME_VALUE',
      'VOLUME_UNITS',
      'MOLES_VALUE',
      'MOLES_UNITS',
      'RECORDED_LSN'
    ],
    columnLabels: [
      'REACTION_DID',
      'NAME',
      'COMPONENT_TYPE',
      'SMILES',
      'EQUIVALENTS',
      'CAS',
      'DENSITY_VALUE',
      'DENSITY_UNITS',
      'ACTUAL_AMOUNT_VALUE',
      'ACTUAL_AMOUNT_UNITS',
      'MOLECULAR_WEIGHT_VALUE',
      'STRENGTH_VALUE',
      'STRENGTH_UNITS',
      'DILUENT',
      'LOT_NUMBER',
      'MASS_VALUE',
      'MASS_UNITS',
      'VOLUME_VALUE',
      'VOLUME_UNITS',
      'MOLES_VALUE',
      'MOLES_UNITS',
      'RECORDED_LSN'
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
      'Double',
      'String',
      'String',
      'String',
      'Double',
      'String',
      'Double',
      'String',
      'Double',
      'String',
      'String'
    ],
    rows: [
      {
        data: [
          '0000bd31044042dbb246e22bd8255a8e',
          '340523',
          'REACTANT',
          'O=C1CCc2ccc(F)cc21',
          '1',
          '#NULL#',
          1.0,
          'DENSITY_G_ML',
          150.0,
          'MASS_G',
          150.152,
          100.0,
          'PURITY_WT_WT',
          '#NULL#',
          'w35-e00372-052',
          150.0,
          'g',
          '#NULL#',
          '#NULL#',
          998.988,
          'mmol',
          '#NULL#'
        ]
      },
      {
        data: [
          '0000bd31044042dbb246e22bd8255a8e',
          'Sodium Tetrahydroborate',
          'REACTANT',
          '[BH4-].[Na+]',
          '0.00261945',
          '16940-66-2',
          1.0,
          'DENSITY_G_ML',
          99.0,
          'MASS_MG',
          37.8325,
          100.0,
          'PURITY_WT_WT',
          '#NULL#',
          '03826ld',
          99.0,
          'mg',
          '#NULL#',
          '#NULL#',
          2.6168,
          'mmol',
          '#NULL#'
        ]
      },
      {
        data: [
          '0000bd31044042dbb246e22bd8255a8e',
          '2061745',
          'PRODUCT',
          'OC1CCc2ccc(F)cc21',
          '0.000618364',
          '#NULL#',
          1.0,
          'DENSITY_G_ML',
          94.0,
          'MASS_MG',
          152.168,
          100.0,
          'PURITY_WT_WT',
          '#NULL#',
          'tj6-e00578-052-a',
          94.0,
          'mg',
          '#NULL#',
          '#NULL#',
          0.6177,
          'mmol',
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
  size: 3530,
  cacheHit: false
};

describe('StoichiometryTableInfoService', () => {
  let service: StoichiometryTableInfoService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoichiometryTableInfoService]
    });
    service = TestBed.get(StoichiometryTableInfoService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should return an Observable with data', () => {
    service.getInfo(ruid).subscribe(data => {
      expect(data).toEqual(dummydata);
    });
    const req = httpMock.expectOne(environment.stoichiometryTableInfo);
    expect(req.request.method).toBe('POST');
    req.flush(dummydata);
  });
  it('should return an error', () => {
    const ruids =
      '0000bd31044042dbb246e22bd8255a8e, 0000bd31044042dbb246e22bd8255a8e';
    service.getInfo(ruids).subscribe(
      data => {},
      err => {
        expect(err.status).toEqual(500, 'status');
      }
    );
    const req = httpMock.expectOne(environment.stoichiometryTableInfo);
    const emsg = 'Internal Server Error';
    req.flush(emsg, { status: 500, statusText: 'error' });
  });
});
