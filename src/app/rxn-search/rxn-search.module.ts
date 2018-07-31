import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { RuidSearchModule } from './../ruid-search/ruid-search.module';
import { RxnSearchHttpInterceptor } from './services/http-interceptor/rxn-search-http-interceptor.service';
import { RxnSearchComponent } from './rxn-search.component';
import { RxnStringToImageDirective } from './directives/rxnstring-to-image/rxnstring-to-image.directive';
import { SharedModule } from '../shared/shared.module';
import { FiltersComponent } from './components/filters/filters.component';
import { RxnResultsComponent } from './components/rxn-results/rxn-results.component';
import * as fromRxnSearchReducer from './store/rxn-search.reducers';
import { MapToKeysPipe } from './pipes/map-to-keys/map-to-keys.pipe';
import { MapYieldToRuidPipe } from './pipes/map-yield-to-ruid/map-yield-to-ruid.pipe';
import { MarvinModalComponent } from './components/marvin-modal/marvin-modal.component';
import { TransformFilterTagPipe } from './pipes/transform-filter-tag/transform-filter-tag.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RuidSearchModule,
    StoreModule.forFeature(
      'rxnSearchState',
      fromRxnSearchReducer.rxnSearchReducer
    )
  ],
  declarations: [
    RxnSearchComponent,
    RxnStringToImageDirective,
    FiltersComponent,
    RxnResultsComponent,
    MapToKeysPipe,
    MapYieldToRuidPipe,
    MarvinModalComponent,
    TransformFilterTagPipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RxnSearchHttpInterceptor,
      multi: true
    }
  ],
  exports: [MarvinModalComponent],
  entryComponents: []
})
export class RxnSearchModule {}
