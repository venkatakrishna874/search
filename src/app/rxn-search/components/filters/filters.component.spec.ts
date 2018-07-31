import { GetVaultNamesService } from './../../services/get-vault-names/get-vault-names.service';
import { NotebookPageAutoCompleteService } from './../../services/notebookpage-autocomplete/notebookpage-auto-complete.service';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { FiltersComponent } from './filters.component';
import { SharedModule } from './../../../shared/shared.module';
import { MapToKeysPipe } from '../../pipes/map-to-keys/map-to-keys.pipe';
import * as fromRxnSearchReducer from '../../store/rxn-search.reducers';
import { GetLabNamesService } from '../../services/get-lab-names/get-lab-names.service';
import * as RxnSearchModuleActions from '../../store/rxn-search.actions';

const expNamesDummyData = [
  'MX5-E00382-001',
  'MX5-E00382-002',
  'MX5-E00382-003'
];
const dummyLabNames = ['Chemists', 'ASL', 'OPSL'];
const dummyVaultNames = ['DCRTZ1', 'JUB', 'PSRDZ2', 'DCRTZ2', 'AMRI'];
const dummyNBNames = [
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
class FakeGetVaultNamesService {
  getVaultNames() {
    return of(dummyVaultNames);
  }
}
class FakeGetLabNamesService {
  getLabNames() {
    return of(dummyLabNames);
  }
}
class FakeNotebookPageAutoCompleteService {
  retrieveNoteBookPageNames() {
    return of(dummyNBNames);
  }
}
describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let store: Store<fromRxnSearchReducer.RxnSearchModuleState>;
  let injector;
  let getVaultNamesService: GetVaultNamesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent, MapToKeysPipe],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          feature: combineReducers(fromRxnSearchReducer.rxnSearchReducer)
        })
      ],
      providers: [
        FormBuilder,
        {
          provide: GetVaultNamesService,
          useClass: FakeGetVaultNamesService
        },
        {
          provide: GetLabNamesService,
          useClass: FakeGetLabNamesService
        },
        {
          provide: NotebookPageAutoCompleteService,
          useClass: FakeNotebookPageAutoCompleteService
        }
      ]
    }).compileComponents();
    injector = getTestBed();
    getVaultNamesService = injector.get(GetVaultNamesService);
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const action = new RxnSearchModuleActions.QueryString('Cl.NCCC1');
    store.dispatch(action);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vault names and lab names', () => {
    getVaultNamesService.getVaultNames().subscribe(data => {
      expect(data).toBe(dummyVaultNames);
    });
  });
});
