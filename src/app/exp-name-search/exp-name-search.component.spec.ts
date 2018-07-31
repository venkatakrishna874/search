import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpNameSearchComponent } from './exp-name-search.component';

describe('ExpNameSearchComponent', () => {
  let component: ExpNameSearchComponent;
  let fixture: ComponentFixture<ExpNameSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpNameSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpNameSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
