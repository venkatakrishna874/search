import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { from } from 'rxjs';
import { StoreModule, combineReducers } from '@ngrx/store';

import { RxnSearchModule } from './rxn-search.module';
import * as fromRxnSearchReducer from './store/rxn-search.reducers';
import { RxnSearchComponent } from './rxn-search.component';
import { SharedModule } from '../shared/shared.module';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};
describe('RxnSearchComponent', () => {
  let component: RxnSearchComponent;
  let fixture: ComponentFixture<RxnSearchComponent>;
  beforeEach(() => {
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
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(RxnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
