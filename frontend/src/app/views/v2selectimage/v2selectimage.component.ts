import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v2SelectimageService } from '../../services/selectimage.service';

@Component({
  selector: 'app-v2selectimage',
  templateUrl: './v2selectimage.component.html',
  styleUrls: ['./v2selectimage.component.css'],
})
export class V2SelectimageComponent {
  imageForm: FormGroup;
  selectedFile: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private selectimageService: v2SelectimageService
  ) {
    this.imageForm = this.fb.group({
      category: [''],
      total: [''],
      merchant: [''],
      date: [''],
      paymentType: [''],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('category', this.imageForm.get('category')?.value);
      formData.append('total', this.imageForm.get('total')?.value);
      formData.append('merchant', this.imageForm.get('merchant')?.value);
      formData.append('date', this.imageForm.get('date')?.value);
      formData.append('paymentType', this.imageForm.get('paymentType')?.value);

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
