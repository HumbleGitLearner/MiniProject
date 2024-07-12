import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v2SelectimageService } from './v2selectimage.service';

@Component({
  selector: 'app-v2selectimage',
  templateUrl: './v2selectimage.component.html',
  styleUrl: './v2selectimage.component.css',
})
export class V2SelectimageComponent {
  // selectedFile: File | null = null;

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  // uploadFile(): void {
  //   if (this.selectedFile) {
  //     // Handle file upload logic (e.g., send to server or process locally)
  //     console.log('Selected file:', this.selectedFile.name);
  //   } else {
  //     console.log('No file selected.');
  //   }
  // }

  imageForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private selectimageService: v2SelectimageService
  ) {
    this.imageForm = this.fb.group({
      image: [null],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.selectimageService.uploadImage(formData).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully', response);
        },
        error: (error) => {
          console.error('Error uploading image', error);
        },
      });
    }
  }
}


