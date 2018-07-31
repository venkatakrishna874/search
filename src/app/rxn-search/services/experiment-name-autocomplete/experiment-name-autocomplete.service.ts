import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperimentNameAutocompleteService {
  constructor(private httpClient: HttpClient) {}
  retrieveExpNames(query: String, offset: number, maxResults: number) {
    const url = `${
      environment.notebookPages
    }?q=${query}&offset=${offset}&max_results=${maxResults}`;
    return this.httpClient.get(url).pipe(
      map((response: Array<string>) => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
