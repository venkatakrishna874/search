import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RxnSearchComponent } from './rxn-search/rxn-search.component';
import { ExpNameSearchComponent } from './exp-name-search/exp-name-search.component';

const appRoutes: Routes = [
  { path: 'rxn-search', component: RxnSearchComponent },
  {
    path: 'ruid-search',
    loadChildren: './ruid-search/ruid-search.module#RuidSearchModule'
  },
  { path: 'exp-search', component: ExpNameSearchComponent },
  { path: '**', redirectTo: 'rxn-search' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
