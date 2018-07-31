import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';

import * as RuidSearchModuleActions from '../../store/ruid-search.actions';
import * as fromRuidSearchReducer from '../../store/ruid-search.reducers';

@Component({
  selector: 'app-ruid',
  templateUrl: './ruid.component.html',
  styleUrls: ['./ruid.component.scss']
})
export class RuidComponent implements OnInit {
  ruidForm: FormGroup;
  @Output() ruid: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRuidSearchReducer.RuidSearchModuleState>
  ) {}

  ngOnInit() {
    this.ruidForm = this.fb.group({
      ruid: new FormControl(null, Validators.required)
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (Object.keys(params).length > 0) {
        this.ruidForm.controls['ruid'].setValue(params.ruid);
        this.ruid.emit(this.ruidForm.get('ruid').value);
        this.store.dispatch(new RuidSearchModuleActions.Ruid(params.ruid));
      }
    });
  }
  goToResults() {
    this.ruid.emit(this.ruidForm.get('ruid').value);
    this.store.dispatch(
      new RuidSearchModuleActions.Ruid(this.ruidForm.get('ruid').value)
    );
    this.router.navigate(['/ruid-search'], {
      queryParams: { ruid: this.ruidForm.get('ruid').value }
    });
  }
}
