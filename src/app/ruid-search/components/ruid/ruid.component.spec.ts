import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRuidSearchReducer from '../../store/ruid-search.reducers';
import * as RuidSearchModuleActions from '../../store/ruid-search.actions';
import { SharedModule } from '../../../shared/shared.module';
import { RuidSearchModule } from '../../ruid-search.module';
import { RuidComponent } from './ruid.component';

describe('RuidComponent', () => {
  let component: RuidComponent;
  let fixture: ComponentFixture<RuidComponent>;
  let store: Store<fromRuidSearchReducer.RuidSearchModuleState>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        RuidSearchModule,
        SharedModule,
        StoreModule.forRoot({
          feature: combineReducers(fromRuidSearchReducer.ruidSearchReducer)
        })
      ],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ ruid: '0000bd31044042dbb246e22bd8255a8e' })
          }
        },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(RuidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.dispatch(
      new RuidSearchModuleActions.Ruid('0000bd31044042dbb246e22bd8255a8e')
    );
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
