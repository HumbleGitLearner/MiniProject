import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-idialog',
  templateUrl: './imagedialog.component.html',
})
export class ImageDialogBoxComponent {
  imageLoaded = false;
  imageError = false;

  constructor(
    private dialogRef: MatDialogRef<ImageDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageBlob: Blob },
    private cdRef: ChangeDetectorRef,
  ) { }
 
  okbtn() {
    this.dialogRef.close(true);
  }

  onImageLoad() {
    this.imageLoaded = true;
    this.cdRef.detectChanges();
  }

  onImageError() {
    this.imageError = true;
    this.dialogRef.close(false);
  }
}
