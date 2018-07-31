import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { MarvinModalComponent } from './rxn-search/components/marvin-modal/marvin-modal.component';
import { MatIconModule } from '@angular/material';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SidenavListComponent,
        MarvinModalComponent
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ]
    }).compileComponents();
  }));
  it('should create', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
