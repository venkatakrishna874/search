import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTooltipModule,
    MatChipsModule
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTooltipModule,
    MatChipsModule
  ]
})
export class SharedModule {}
