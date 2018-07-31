// import { RouterTestingModule } from '@angular/router/testing';
// import {
//   async,
//   ComponentFixture,
//   TestBed,
//   getTestBed
// } from '@angular/core/testing';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   Validators
// } from '@angular/forms';
// import {
//   ActivatedRoute,
//   Params,
//   Data,
//   NavigationExtras,
//   Router
// } from '@angular/router';

// import { MarvinModalComponent } from './marvin-modal.component';
// import { StoreModule, Store, UPDATE } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';

// import * as fromAppReducer from '../store/app.reducers';
// import * as AppActions from '../store/app.actions';
// import 'rxjs/add/observable/of';

// class RouterStub {
//   navigate(commands: any[], extras?: NavigationExtras) {}
// }
// const storedata = [
//   {
//     modalStatus: true,
//     searchString: '[H]N(C(=O)C([H])([H])C)C1([H])CCCCC1',
//     chemString: '[H]N(C(=O)C([H])([H])C)C1([H])CCCCC1',
//     searchCriteria: new FormBuilder().group({
//       searchInput: new FormControl(
//         '[H]N(C(=O)C([H])([H])C)C1([H])CCCCC1',
//         Validators.required
//       ),
//       searchType: new FormControl('SUBSTRUCTURE'),
//       componentType: new FormControl('PRODUCT')
//     })
//   }
// ];

// class MockStore {
//   public dispatch(obj) {}

//   public select(obj) {
//     return Observable.of(storedata);
//   }
// }
// describe('MarvinModalComponent', () => {
//   let injector;
//   let component: MarvinModalComponent;
//   let fixture: ComponentFixture<MarvinModalComponent>;
//   let store: Store<any>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         StoreModule.forRoot(fromAppReducer.reducers),
//         RouterTestingModule
//       ],
//       providers: [
//         {
//           provide: Store,
//           useClass: MockStore
//         },
//         { provide: Router, useClass: RouterStub }
//       ],
//       declarations: [MarvinModalComponent]
//     }).compileComponents();
//     injector = getTestBed();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MarvinModalComponent);
//     component = fixture.componentInstance;
//     store = fixture.debugElement.injector.get(Store);
//     fixture.detectChanges();
//     store.dispatch(
//       new AppActions.QueryString('[H]N(C(=O)C([H])([H])C)C1([H])CCCCC1')
//     );
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should dispach the action to the store', () => {
//     store.select('rxnData').subscribe(response => {
//       expect(response).toBe(storedata);
//     });
//   });
//   it('should set the structure to the Marvin modal', () => {
//     component.setStructure('[H]N(C(=O)C([H])([H])C)C1([H])CCCCC1');
//   });
//   it('should close the Marvin modal', () => {
//     component.closeModal();
//     component.getStructure();
//   });
// });
