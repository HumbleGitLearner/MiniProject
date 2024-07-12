import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cdialog',
  templateUrl: './cdialog.component.html',
})
export class cDialogBoxComponent {
  constructor(private dialogRef: MatDialogRef<cDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string[] }) {}

  okbtn() {
    this.dialogRef.close(true);
  }
}
