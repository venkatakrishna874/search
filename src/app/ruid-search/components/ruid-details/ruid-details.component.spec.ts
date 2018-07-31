import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { StoreModule, combineReducers, Store } from '@ngrx/store';

import { SharedModule } from '../../../shared/shared.module';
import { RuidDeatilsComponent } from './ruid-details.component';
import { SmilesToImageDirective } from './../../directives/smiles-to-image.directive';
import { RxnToImageDirective } from './../../directives/rxn-to-image.directive';
import * as fromRuidSearchReducer from '../../store/ruid-search.reducers';
import { RuidInfoService } from '../../services/ruid-info/ruid-info.service';

const ruidInfoData = {
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

class MockRuidInfoService extends RuidInfoService {
  constructor() {
    super(null, null);
  }

  public getDetails() {
    return of(ruidInfoData);
  }
}
describe('RuidDeatilsComponent', () => {
  let component: RuidDeatilsComponent;
  let fixture: ComponentFixture<RuidDeatilsComponent>;
  let store: Store<fromRuidSearchReducer.RuidSearchModuleState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RuidDeatilsComponent,
        RxnToImageDirective,
        SmilesToImageDirective
      ],
      imports: [
        SharedModule,
        StoreModule.forRoot({
          feature: combineReducers(fromRuidSearchReducer.ruidSearchReducer)
        })
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ ruid: '0000bd31044042dbb246e22bd8255a8e' })
          }
        },
        {
          provide: RuidInfoService,
          useClass: MockRuidInfoService
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(RuidDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
