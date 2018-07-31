// import { By } from '@angular/platform-browser';
// import { Renderer2 } from '@angular/core';
// import { TestBed, ComponentFixture, getTestBed } from '@angular/core/testing';
// import {
//   Params,
//   ActivatedRoute,
//   NavigationExtras,
//   Router
// } from '@angular/router';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import 'rxjs/add/observable/of';
// import { Observable } from 'rxjs/Observable';

// import { RxnStringToImageDirective } from './rxnstring-to-image.directive';
// import { ResultsComponent } from '../results/results.component';
// import { HighlighterService } from './../services/highlighter/highlighter.service';
// import { ResultsModule } from '../results/results.module';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Store, StoreModule } from '@ngrx/store';

// const dummyRxnString =
//   '[CH2:1]1[CH2:2][CH2:4][CH2:5][CH2:6][CH:3]1[NH2:7].[Cl:8][CH2:9][CH2:10][CH2:11]';
// const output = `<?xml version="1.0" encoding="ISO-8859-1"?><cml
// </cml>`;

// const dummydata = [
//   {
//     ruid: '02b01f46288b4f71950d03856bc8f173',
//     rxnString: 'Cl.NCCC1(C(F)(F)F)CC1.NCC1=CC=CC(NC564'
//   },
//   {
//     ruid: '02b01f46288b4f71950d03856bc8f173',
//     rxnString: 'Cl.NCCC1(C(F)(F)F)CC1.NCC1=CC=CC(NC23'
//   }
// ];
// const dummyParams = {
//   q: '[H]N(C(=O)C([H])([H])C)C1([H])CCCC22',
//   searchType: 'SUBSTRUCTURE',
//   componentType: 'AGENT'
// };

// class FakeHighlighterService {
//   getHighlighter() {
//     return Observable.of(output);
//   }
// }
// class FakeRxnsSearchService {
//   getReactions() {
//     return Observable.of(dummydata);
//   }
// }
// const count: number = 100;
// class FakeRxnsSearchHitCountService {
//   getHitCount() {
//     return Observable.of(count);
//   }
// }
// class RouterStub {
//   navigate(commands: any[], extras?: NavigationExtras) {}
// }
// class ActivatedRouteStub {
//   private testParams: {};
//   private subject = new BehaviorSubject(this.testParams);
//   queryParams = this.subject.asObservable();
//   setQueryParams(params: Params) {
//     this.testParams = params;
//     this.subject.next(params);
//   }
// }
// describe('Directive Render Reaction String to  image ', () => {
//   let fixture: ComponentFixture<ResultsComponent>;
//   let component: ResultsComponent;
//   let rxn;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ResultsModule, StoreModule.forRoot({})],
//       declarations: [],
//       providers: [
//         ResultsComponent,
//         { provide: ActivatedRoute, useValue: ActivatedRouteStub },
//         {
//           provide: HighlighterService,
//           useClass: FakeHighlighterService
//         },
//         { provide: Router, useClass: RouterStub },
//         Renderer2
//       ]
//     }).compileComponents();
//     TestBed.overrideComponent(ResultsComponent, {
//       set: {
//         template: `<div appRenderRxnToImage [rxn]='reaction.rxnString' [index]='i'>
//                       <div id="imageContainer" >
//                         <img id="image" class="bordered" />
//                       </div>
//                     </div>`
//       }
//     });
//     fixture = TestBed.get(ResultsComponent);
//     fixture.detectChanges();
//     component = fixture.componentInstance;
//     rxn = fixture.debugElement.query(By.directive(RxnStringToImageDirective));
//   });
//   it('should be defined', () => {
//     expect(component).toBeDefined();
//   });
// });
