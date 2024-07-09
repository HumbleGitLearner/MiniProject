import { Component } from '@angular/core';

@Component({
  selector: 'app-v2-selectimage',
  templateUrl: './v2-selectimage.component.html',
  styleUrl: './v2-selectimage.component.css'
})
export class V2SelectimageComponent {

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      // Handle file upload logic (e.g., send to server or process locally)
      console.log('Selected file:', this.selectedFile.name);
    } else {
      console.log('No file selected.');
    }
  }
}
