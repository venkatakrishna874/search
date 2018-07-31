import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private router: Router
  ) {}

  onClose(): void {
    this.dialog.closeAll();
    this.dialog.afterAllClosed.subscribe(res => {});
  }
  ngOnInit() {}
}
