import { RuidComponent } from './components/ruid/ruid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { SmilesToImageDirective } from './directives/smiles-to-image.directive';
import { CleanWS } from './services/clean/cleanws.service';
import { RuidSearchComponent } from './ruid-search.component';
import { SharedModule } from '../shared/shared.module';
import { RuidDeatilsComponent } from './components/ruid-details/ruid-details.component';
import { RxnToImageDirective } from './directives/rxn-to-image.directive';
import { RuidComponentsPipe } from './pipes/ruid-components.pipe';
import * as fromRuidSearchReducer from './store/ruid-search.reducers';
import { RuidSearchRoutingModule } from './ruid-search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(
      'ruidSearchState',
      fromRuidSearchReducer.ruidSearchReducer
    ),
    RuidSearchRoutingModule
  ],
  providers: [CleanWS],
  declarations: [
    RuidSearchComponent,
    RuidDeatilsComponent,
    RxnToImageDirective,
    SmilesToImageDirective,
    RuidComponent,
    RuidComponentsPipe
  ],
  exports: [RuidDeatilsComponent]
})
export class RuidSearchModule {}
