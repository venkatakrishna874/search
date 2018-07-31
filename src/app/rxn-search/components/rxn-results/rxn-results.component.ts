import { ActivatedRoute, Router, Params } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, forkJoin, empty } from 'rxjs';
import { MatPaginator } from '@angular/material';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { YieldsService } from '../../services/yields/yields.service';
import { RxnsSearchHitCountService } from '../../services/rxn-hit-count/rxns-search-hit-count.service';
import { RxnsSearchService } from '../../services/rxn-search/rxns-search.service';
import * as RxnSearchModuleActions from '../../store/rxn-search.actions';
import * as fromRxnSearchReducer from '../../store/rxn-search.reducers';

@Component({
  selector: 'rxn-results',
  templateUrl: './rxn-results.component.html',
  styleUrls: ['./rxn-results.component.scss']
})
export class RxnResultsComponent implements OnInit, OnChanges {
  @Output() filtersToggle: EventEmitter<void> = new EventEmitter<void>();
  @Input() filters: any;
  public reactions: Array<any> = [];
  public total: number;
  public loading: boolean = false;
  public error: boolean = false;
  public searchForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public paramerts: any;
  public perPage: number = 5;
  public ruidDetailsPage: string = environment.ruidDetailsPage;
  public yields: any;
  public startingMsg: boolean = true;
  public pagination: boolean = false;

  constructor(
    private store: Store<fromRxnSearchReducer.RxnSearchModuleState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private rxnsSearchService: RxnsSearchService,
    private rxnsSearchHitCountService: RxnsSearchHitCountService,
    private yieldsService: YieldsService
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchInput: new FormControl(null, Validators.required),
      searchType: new FormControl('SUBSTRUCTURE')
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (Object.keys(params).length > 0) {
        this.startingMsg = false;
        this.searchForm.controls['searchInput'].setValue(params.query);
        this.searchForm.controls['searchType'].setValue(params.searchType);
        this.store.dispatch(
          new RxnSearchModuleActions.QueryString(params.query)
        );
        this.filters = this.filters === undefined ? {} : this.filters;
        this.displayreactions(this.filters);
      }
    });

    this.store.select('rxnSearchState').subscribe(data => {
      this.searchForm.controls['searchInput'].setValue(
        data.slice(-1)[0].queryString
      );
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['filters'].isFirstChange()) {
      this.displayreactions(this.filters);
    }
  }
  goToResults() {
    const query = this.searchParams.query;
    if (query !== null && query !== '' && query !== undefined) {
      this.startingMsg = false;
      this.router.navigate(['/rxn-search'], {
        queryParams: this.searchParams
      });
      this.filters = this.filters === undefined ? {} : this.filters;
      this.displayreactions(this.filters);
    }
  }
  openMarvinModal() {
    this.store.dispatch(new RxnSearchModuleActions.ModalStatus(true));
  }
  toggleFilters() {
    this.filtersToggle.emit();
  }
  handlePage(event) {
    this.loading = true;
    const perPage = event.pageSize;
    const offset = event.pageIndex * perPage;
    this.rxnsSearchService
      .getReactions(this.searchParams, offset, perPage, this.filters)
      .subscribe(response => {
        this.loading = false;
        this.reactions = response;
        this.getYields(response);
      });
  }
  viewDetails(reaction) {
    return (reaction['expanded'] = !reaction['expanded']);
  }
  private displayreactions(filters: any) {
    if (this.searchParams.query !== null && this.searchParams.query !== '') {
      this.startingMsg = false;
      this.loading = true;
      this.pagination = true;
      this.total = 0;
      this.reactions = [];
      const rxnsObservable: Observable<
        Array<any>
      > = this.rxnsSearchService.getReactions(
        this.searchParams,
        0,
        this.perPage,
        filters
      );
      rxnsObservable.subscribe((rxns: Array<any>) => {
        this.getYields(rxns);
      });
      const headCountObservable: Observable<
        number
      > = this.rxnsSearchHitCountService.getHitCount(
        this.searchParams,
        filters
      );

      forkJoin([rxnsObservable, headCountObservable])
        .pipe(
          catchError((err, caught) => {
            this.error = true;
            this.loading = false;
            return empty();
          })
        )
        .subscribe(
          results => {
            this.loading = false;
            this.reactions = results['0'];
            for (const reaction of this.reactions) {
              reaction['expanded'] = false;
            }
            this.total = results['1'];
            this.paginator.pageIndex = 0;
            console.log(results);
          },
          error => {
            console.log(error);
          }
        );
    }
  }
  private getYields(rxns: Array<any>) {
    const ruids: Array<string> = [];
    for (const rxn of rxns) {
      ruids.push(rxn.ruid);
    }
    this.yieldsService.getYields(ruids).subscribe(data => {
      this.yields = data;
    });
  }

  private get searchParams(): any {
    const params = {
      query: this.searchForm.get('searchInput').value,
      searchType: this.searchForm.get('searchType').value
    };
    return params;
  }
}
