import { QueryString } from './../../store/rxn-search.actions';
import { RxnsSearchService } from './../../services/rxn-search/rxns-search.service';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { from, of } from 'rxjs';
import { StoreModule, combineReducers, Store } from '@ngrx/store';

import { RxnResultsComponent } from './rxn-results.component';
import { SharedModule } from '../../../shared/shared.module';
import * as fromRxnSearchReducer from '../../store/rxn-search.reducers';
import { RxnSearchModule } from '../../rxn-search.module';
import * as RxnSearchModuleActions from '../../store/rxn-search.actions';

const RxnSearchDummyData = [
  {
    ruid: '76b95985e1344b3b8ac6d1e3c89aad8e_3',
    highlightedRxnString: 'PD94bWwgdmVyc2lvbj0iMS'
  }
];

class MockRxnsSearchService extends RxnsSearchService {
  constructor() {
    super(null);
  }

  public getDetails() {
    return of(RxnSearchDummyData);
  }
}

const StoreData = [
  {
    modalStatus: false,
    queryString: '>>[H]C(N([H])C(=O)N([H])C)C1=CC=CC=C1'
  },
  {
    modalStatus: false,
    queryString: '>>[H]C(N([H])C(=O)N([H])C)C1=CC=CC=C1'
  }
];
const dummydata = [
  {
    ruid: '02b01f46288b4f71950d03856bc8f173',
    rxnString: 'Cl.NCCC1(C(F)(F)F)CC1.NCC1=CC=CC(NC564'
  },
  {
    ruid: '02b01f46288b4f71950d03856bc8f173',
    rxnString: 'Cl.NCCC1(C(F)(F)F)CC1.NCC1=CC=CC(NC23'
  }
];

describe('RxnResultsComponent', () => {
  let component: RxnResultsComponent;
  let fixture: ComponentFixture<RxnResultsComponent>;
  let store: Store<fromRxnSearchReducer.RxnSearchModuleState>;

  beforeEach(async(() => {
    const mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SharedModule,
        RxnSearchModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          feature: combineReducers(fromRxnSearchReducer.rxnSearchReducer)
        })
      ],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: from([
              {
                query: '>>[H]C(N([H])C(=O)N([H])C)C1=CC=CC=C1',
                searchType: 'SUBSTRUCTURE'
              }
            ])
          }
        },
        { provide: Router, useValue: mockRouter },
        {
          provide: RxnsSearchService,
          useClass: MockRxnsSearchService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(RxnResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const action = new RxnSearchModuleActions.QueryString('Cl.NCCC1');
    store.dispatch(action);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
