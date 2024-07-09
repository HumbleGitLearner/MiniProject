import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout.component.html',
})
export class LogoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<LogoutDialogComponent>) {}

  confirmLogout() {
    this.dialogRef.close(true);
  }

  cancelLogout() {
    this.dialogRef.close(false);
  }
}
