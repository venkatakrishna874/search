import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './shared/errors-component/errors.component';
import { RxnSearchModule } from './rxn-search/rxn-search.module';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ExpNameSearchComponent } from './exp-name-search/exp-name-search.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    SidenavListComponent,
    ExpNameSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RxnSearchModule,
    SharedModule,
    StoreModule.forRoot({})
  ],
  providers: [],
  entryComponents: [ErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
