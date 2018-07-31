import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

import { Store } from '@ngrx/store';
import {
  filter,
  merge,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

import * as fromRxnSearchReducer from '../../store/rxn-search.reducers';
import { ExperimentNameAutocompleteService } from '../../services/experiment-name-autocomplete/experiment-name-autocomplete.service';
import { GetLabNamesService } from '../../services/get-lab-names/get-lab-names.service';
import { GetVaultNamesService } from '../../services/get-vault-names/get-vault-names.service';
import { NotebookPageAutoCompleteService } from '../../services/notebookpage-autocomplete/notebookpage-auto-complete.service';

@Component({
  selector: 'rxn-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [DatePipe, GetVaultNamesService, GetLabNamesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit, AfterViewInit {
  public filterOptionsForm: FormGroup;
  public suggestedExpNames: Array<String>;
  public suggestedNBPageNames: Array<string>;
  public maxDate = new Date();
  public minDate = new Date(1850, 0, 1);
  public startAt = new Date(2000, 0, 1);
  private query: string;
  public isFiltersSelected: boolean = false;
  Array = Array;
  @Output() closeFilters: EventEmitter<void> = new EventEmitter<void>();
  @Output() filters: EventEmitter<any> = new EventEmitter<any>();
  filterOptionsMapped: any;

  constructor(
    private store: Store<fromRxnSearchReducer.RxnSearchModuleState>,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private expNameAutoComplete: ExperimentNameAutocompleteService,
    private NBPageAutoComplete: NotebookPageAutoCompleteService,
    private getLabNamesService: GetLabNamesService,
    private getVaultNamesService: GetVaultNamesService
  ) {}

  ngOnInit() {
    this.filterOptionsForm = this.formBuilder.group(
      {
        minYield: new FormControl(),
        maxYield: new FormControl(),
        startDate: new FormControl(),
        endDate: new FormControl(),
        experimentName: new FormControl(),
        notebookPage: new FormControl(),
        vaultNames: this.formBuilder.array([]),
        labNames: this.formBuilder.array([])
      },
      { validator: this.checkFilterOptionsValidOrNot.bind(this) }
    );
    this.filterOptionsMapped = this.filterOptions;
    this.store.select('rxnSearchState').subscribe(data => {
      if (data !== undefined) {
        this.query = data.slice(-1)[0].queryString;
      }
    });
    this.filterOptionsForm
      .get('experimentName')
      .valueChanges.pipe(filter(val => val.length >= 3 && this.query !== null))
      .subscribe(expName => {
        expName = expName.toUpperCase();
        this.expNameAutoComplete
          .retrieveExpNames(expName, 0, 25)
          .pipe()
          .subscribe(suggestedExpNames => {
            this.suggestedExpNames = suggestedExpNames;
          });
      });
    this.filterOptionsForm
      .get('notebookPage')
      .valueChanges.pipe(
        filter(value => value.length >= 3 && this.query !== null)
      )
      .subscribe(nbPage => {
        nbPage = nbPage.toUpperCase();
        this.NBPageAutoComplete.retrieveNoteBookPageNames(nbPage, 0, 25)
          .pipe()
          .subscribe(suggestedNBPageNames => {
            this.suggestedNBPageNames = suggestedNBPageNames;
          });
      });

    this.filterOptionsForm
      .get('maxYield')
      .valueChanges.pipe(
        merge(this.filterOptionsForm.get('minYield').valueChanges),
        debounceTime(1000),
        distinctUntilChanged(),
        filter(value => 0 <= value && value <= 100 && this.query !== null)
      )
      .subscribe(value => {
        this.filters.emit(this.filterOptions);
      });
    this.filterOptionsForm
      .get('experimentName')
      .valueChanges.pipe(
        merge(this.filterOptionsForm.get('notebookPage').valueChanges),
        debounceTime(1500),
        filter(value => this.query !== null)
      )
      .subscribe(value => {
        this.filters.emit(this.filterOptions);
      });

    this.filterOptionsForm
      .get('startDate')
      .valueChanges.pipe(
        merge(this.filterOptionsForm.get('endDate').valueChanges)
      )
      .subscribe(data => {
        this.filters.emit(this.filterOptions);
      });
  }
  ngAfterViewInit() {
    this.getVaultNamesService.getVaultNames().subscribe(vaultNames => {
      this.generateFormArray('vaultNames', vaultNames);
    });
    this.getLabNamesService
      .getLabNames()
      .pipe()
      .subscribe(labNames => {
        this.generateFormArray('labNames', labNames);
      });
  }
  checkboxValueChanges() {
    this.filters.emit(this.filterOptions);
  }

  onDeselectFilterOption(key, selectedValue) {
    if (key === 'vaultNames' || key === 'labNames') {
      const filters = (this.filterOptionsForm.controls[key] as FormArray)
        .controls;
      for (let i = 0; i < filters.length; i++) {
        if (Object.keys(filters[i]['controls']).toString() === selectedValue) {
          Object.values(
            (this.filterOptionsForm.controls[key] as FormArray).controls[i][
              'controls'
            ]
          )['0'].setValue(false);
          this.filters.emit(this.filterOptions);
        }
      }
    } else {
      this.filterOptionsForm.controls[key].reset();
      const temp = this.filterOptions;
    }
  }

  optionSelected() {
    this.filters.emit(this.filterOptions);
  }
  closeFiltersMenu() {
    this.closeFilters.emit();
  }
  private checkFilterOptionsValidOrNot(filtersForm: FormGroup) {
    const minYield = filtersForm.get('minYield');
    const maxYield = filtersForm.get('maxYield');
    const startDate = filtersForm.get('startDate');
    const endDate = filtersForm.get('endDate');

    if (
      startDate.value !== null &&
      endDate.value !== null &&
      startDate.value > endDate.value
    ) {
      startDate.setErrors({ startDateAfterEndDate: true });
    } else {
      startDate.setErrors(null);
    }
    if (minYield.value > 100 || minYield.value < 0) {
      minYield.setErrors({ valueError: true });
    } else if (maxYield.value > 100 || maxYield.value < 0) {
      maxYield.setErrors({ valueError: true });
    } else {
      minYield.setErrors(null);
      maxYield.setErrors(null);
    }
    return filtersForm;
  }
  get vaultNames(): FormArray {
    return this.filterOptionsForm.get('vaultNames') as FormArray;
  }
  get labNames(): FormArray {
    return this.filterOptionsForm.get('labNames') as FormArray;
  }
  private generateFormArray(type: string, names: string[]) {
    const namesFGs = names.map(name => {
      const obj = {};
      obj[name] = false;
      return this.formBuilder.group(obj);
    });
    const vaultsFormArray = this.formBuilder.array(namesFGs);
    this.filterOptionsForm.setControl(type, vaultsFormArray);
  }
  private get filterOptions() {
    const filters: any = {};
    const controls = this.filterOptionsForm.controls;
    for (const name in controls) {
      if (controls[name].valid && controls[name].value !== null) {
        switch (name) {
          case 'maxYield':
          case 'minYield':
            filters[name] = controls[name].value;
            break;
          case 'endDate':
          case 'startDate':
            filters[name] = this.datePipe.transform(
              controls[name].value,
              'yyyy-MM-dd'
            );
            break;
          case 'vaultNames':
          case 'labNames':
            filters[name] = [];
            for (const value of controls[name].value) {
              for (const key in value) {
                if (value[key]) {
                  filters[name].push(key);
                }
              }
            }
            if (filters[name].length === 0) {
              delete filters[name];
            }
            break;
          case 'experimentName':
          case 'notebookPage':
            if (controls[name].value.length > 0) {
              filters[name] = controls[name].value;
            }
            break;
        }
      }
    }
    this.filterOptionsMapped = filters;
    return filters;
  }
}
