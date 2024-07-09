import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-recover-dialog',
  templateUrl: './recoverpass.component.html',
})
export class RecoverDialogComponent {
  constructor(private dialogRef: MatDialogRef<RecoverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  // confirmLogout() {
  //   this.dialogRef.close(true);
  // }

  cancel() {
    this.dialogRef.close(false);
  }
}
