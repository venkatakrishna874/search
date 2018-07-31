import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import * as RxnSearchModuleActions from '../../store/rxn-search.actions';
import * as fromRxnSearchReducer from '../../store/rxn-search.reducers';

declare var MarvinJSUtil: any;

@Component({
  selector: 'app-marvin-modal',
  templateUrl: './marvin-modal.component.html',
  styleUrls: ['./marvin-modal.component.scss']
})
export class MarvinModalComponent implements OnInit, OnDestroy {
  showMarvinModal: boolean;
  str: string;

  constructor(
    private ngZone: NgZone,
    public store: Store<fromRxnSearchReducer.RxnSearchModuleState>
  ) {}

  ngOnInit() {
    this.store.select('rxnSearchState').subscribe(data => {
      this.showMarvinModal = data.slice(-1)[0].modalStatus;
      const strString = data.slice(-1)[0].queryString;
      if (strString !== null && strString !== '' && this.showMarvinModal) {
        setTimeout(() => {
          this.setStructure(strString);
        }, 10);
      }
    });
  }
  closeModal() {
    this.store.dispatch(new RxnSearchModuleActions.ModalStatus(false));
  }
  setStructure(source) {
    const marvinSketch = MarvinJSUtil.getEditor('#sketch');
    marvinSketch.then(sketchInstance => {
      sketchInstance.importStructure('any', source).catch(error => {
        console.log(error);
      });
    });
  }
  getStructure() {
    const marvinSketch = MarvinJSUtil.getEditor('#sketch');
    marvinSketch
      .then(sketchInstance => {
        sketchInstance
          .exportStructure('smiles')
          .then(source => {
            this.store.dispatch(new RxnSearchModuleActions.QueryString(source));
            this.ngZone.run(() => {
              this.showMarvinModal = false;
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
  ngOnDestroy() {}
}
