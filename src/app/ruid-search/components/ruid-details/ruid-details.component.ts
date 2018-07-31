import { element } from 'protractor';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';

import { StoichiometryTableInfoService } from './../../services/stoichiometry-table/stoichiometry-table-info';
import { RuidInfoService } from '../../services/ruid-info/ruid-info.service';
import { ChemistryFriendlyUnits } from '../../chemistry-friendly-units';
import * as fromRuidSearchReducer from '../../store/ruid-search.reducers';

@Component({
  selector: 'app-ruid-details',
  templateUrl: './ruid-details.component.html',
  styleUrls: ['./ruid-details.component.scss']
})
export class RuidDeatilsComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() ruid: string = '';
  @Input() showReactionImage?: boolean = true;
  loading: boolean = true;
  ruidsData: Array<any> = [];
  LOTNumber = [];
  stoichiometryTablePanelOpenState: boolean = false;
  procedurePanelOpenState: boolean = false;
  yieldTablePanelOpenState: boolean = false;
  yieldTableColumns: ReadonlyArray<string> = ['Name', 'Percentage Yield'];
  stoichiometryTableColumnsDefined: ReadonlyArray<string> = [
    'LSN',
    'Name',
    'Structure',
    'CAS#',
    'Density (g/mL)',
    'Purity/Conc',
    'Diluent',
    'Mol Wt.',
    'Lot Number',
    'Role',
    'Equivalents',
    'Actual Amount',
    'Actual Calc Mass',
    'Actual Calc Vol',
    'Actual Calc Moles'
  ];
  stoichiometryTableData: Array<any> = [];
  public stoichiometryTableColumnsToDisplay = [
    'LSN',
    'Name',
    'Mol Wt.',
    'Lot Number',
    'Role',
    'Equivalents',
    'Actual Amount'
  ];

  constructor(
    private ruidInfoService: RuidInfoService,
    private route: ActivatedRoute,
    private stoichiometryTableInfoService: StoichiometryTableInfoService,
    private store: Store<fromRuidSearchReducer.RuidSearchModuleState>
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (this.ruid !== undefined) {
      this.getRuidInfo(this.ruid);
    }
  }
  ngAfterViewInit() {}

  ngOnInit() {
    this.loading = true;
    this.route.queryParams.subscribe((params: Params) => {
      this.ruid = params['ruid'];
    });
  }
  toggelMaterialData() {
    const materialDataColumns: ReadonlyArray<string> = [
      'CAS#',
      'Structure',
      'Density (g/mL)',
      'Purity/Conc',
      'Diluent'
    ];

    if (!(this.stoichiometryTableColumnsToDisplay.indexOf('CAS#') > 0)) {
      this.stoichiometryTableColumnsToDisplay.splice(
        2,
        0,
        ...materialDataColumns
      );
    } else {
      this.stoichiometryTableColumnsToDisplay.splice(
        this.stoichiometryTableColumnsToDisplay.indexOf('CAS#'),
        5
      );
    }
  }
  toggelAmoutData() {
    const AmountDataColumns: ReadonlyArray<string> = [
      'Actual Calc Mass',
      'Actual Calc Vol',
      'Actual Calc Moles'
    ];
    if (
      !(this.stoichiometryTableColumnsToDisplay.indexOf('Actual Calc Mass') > 0)
    ) {
      this.stoichiometryTableColumnsToDisplay.push(...AmountDataColumns);
    } else {
      this.stoichiometryTableColumnsToDisplay.splice(
        this.stoichiometryTableColumnsToDisplay.indexOf('Actual Calc Mass'),
        3
      );
    }
  }

  private getRuidInfo(ruid: string) {
    this.loading = true;
    this.ruidsData = [];
    this.ruidInfoService.getDetails(ruid).subscribe(
      (data: any) => {
        this.loading = false;
        const value = data['returnValue']['rows'];
        for (let i = 0; i < value.length; i++) {
          const ruidData = {
            ruid: value[i].data['0'],
            experimentName: value[i].data['5'],
            procedure: value[i].data['13'].replace(
              new RegExp('\n \n', 'g'),
              '<br /><br />'
            ),
            source: value[i].data['2'],
            eLNHyperLink: this.eLNHyperLink(value[i].data['5']),
            patentLink:
              'https://patents.google.com/patent/' +
              value[i].data['5'].split(',')[0] +
              '/en',
            investigatorName: value[i].data['3'],
            rxnData: value[i].data['4'],
            productsWithYields: this.productsAndYields(data, value[i])
          };
          this.ruidsData.push(ruidData);
        }
      },
      error => {
        console.log(error);
      }
    );
    this.stoichiometryTableInfoService.getInfo(ruid).subscribe((data: any) => {
      for (const i of data['returnValue']['rows']) {
        const component = {
          RUID: i.data['0'],
          Name: i.data['1'],
          Role: this.capitalizeFirstLetter(i.data['2']),
          Structure: this.checkForNull(i.data['3']),
          Equivalents: this.checkForNull(i.data['4']),
          'Actual Amount': this.conactActualAmountValueAndUnits(
            i.data['8'],
            i.data['9']
          ),
          'Density (g/mL)': this.checkForNull(i.data['6']),
          'Purity/Conc': this.conactActualAmountValueAndUnits(
            i.data['11'],
            i.data['12']
          ),
          'Mol Wt.': i.data['10'],
          'Lot Number': this.checkForNull(i.data['14']),
          'CAS#': this.checkForNull(i.data['5']),
          Diluent: this.checkForNull(i.data['13']),
          'Actual Calc Mass': this.conactActualAmountValueAndUnits(
            i.data['15'],
            i.data['16']
          ),
          'Actual Calc Vol': this.conactActualAmountValueAndUnits(
            i.data['17'],
            i.data['18']
          ),
          'Actual Calc Moles': this.conactActualAmountValueAndUnits(
            i.data['19'],
            i.data['20']
          ),
          LSN: this.checkForNull(i.data['21'])
        };
        this.stoichiometryTableData.push(component);
        // if (component['Lot Number'] !== '--') {
        //   this.LOTNumber.push(component['Lot Number']);
        // }
      }
    });
  }
  private capitalizeFirstLetter(string) {
    const k = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    return k;
  }
  private concatValueAndUnits(value, units) {
    if (value !== '#NULL#' && units !== '#NULL#') {
      return value + units;
    } else {
      return '--';
    }
  }
  private checkForNull(value) {
    if (value !== '#NULL#') {
      return value;
    } else {
      return '--';
    }
  }
  private conactActualAmountValueAndUnits(value, units) {
    if (value !== '#NULL#' && units !== '#NULL#') {
      const units2 = ChemistryFriendlyUnits[units];
      if (units2 === undefined) {
        return value + units;
      } else {
        return value + units2;
      }
    } else {
      return '--';
    }
  }
  private eLNHyperLink(link) {
    if (link.length > 15) {
      return 'https://elnr.am.lilly.com/?nbref=' + link.slice(0, 14);
    } else {
      return 'https://elnr.am.lilly.com/?nbref=' + link;
    }
  }

  private productsAndYields(data, yields) {
    const columnLabels = data['returnValue']['columnLabels'];
    const products = [];
    for (let i = 0, j = 1; i < columnLabels.length; i++) {
      if (
        columnLabels[i].search('PRODUCT_' + j + '_NAME') > -1 &&
        columnLabels[i + 1].search('PRODUCT_' + j + '_PERCENT_YIELD') > -1
      ) {
        const product = {
          Name: this.checkForNull(yields['data'][i]),
          'Percentage Yield': this.checkForNull(yields['data'][i + 1])
        };
        if (product['Name'] !== '--' || product['Percentage Yield'] !== '--') {
          products.push(product);
        }
        j++;
      }
    }
    return products;
  }
  ngOnDestroy() {}
}
