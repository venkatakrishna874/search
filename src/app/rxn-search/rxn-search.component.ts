import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-rxn-search',
  templateUrl: './rxn-search.component.html',
  styleUrls: ['./rxn-search.component.scss']
})
export class RxnSearchComponent implements OnInit, OnDestroy {
  public opened: boolean = true;
  public mobileQuery: MediaQueryList;
  public filters: any;
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 720px)');
    this._mobileQueryListener = () => {
      this.opened = false;
      this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  filtersMenuChange() {
    const event = new CustomEvent('filtersMenuStatusChanged');
    document.dispatchEvent(event);
  }
  getfilterValues(value) {
    this.filters = value;
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
