import { RxnSearchModule } from './../../rxn-search.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable()
export class GetVaultNamesService {
  constructor(private httpClient: HttpClient) {}
  getVaultNames() {
    return this.httpClient.get(environment.getVaultNames).pipe(
      map((response: Array<string>) => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
