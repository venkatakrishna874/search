import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { from } from 'rxjs';

import { RuidComponent } from './components/ruid/ruid.component';
import { SmilesToImageDirective } from './directives/smiles-to-image.directive';
import { RuidSearchComponent } from './ruid-search.component';
import { RuidDeatilsComponent } from './components/ruid-details/ruid-details.component';
import { SharedModule } from '../shared/shared.module';
import { RxnToImageDirective } from './directives/rxn-to-image.directive';
import * as fromRuidSearchReducer from './store/ruid-search.reducers';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};
describe('RuidSearchComponent', () => {
  let component: RuidSearchComponent;
  let fixture: ComponentFixture<RuidSearchComponent>;
  let store: Store<fromRuidSearchReducer.RuidSearchModuleState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RuidSearchComponent,
        RuidComponent,
        RuidDeatilsComponent,
        RxnToImageDirective,
        SmilesToImageDirective
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          feature: combineReducers(fromRuidSearchReducer.ruidSearchReducer)
        })
      ],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: from([{ ruid: '0000bd31044042dbb246e22bd8255a8e' }])
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(RuidSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
