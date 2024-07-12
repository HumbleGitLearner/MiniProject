import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private apiUrl = 'http://localhost:8080/api/images'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  async takePhoto(): Promise<string | null | undefined> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
      });
      return image.dataUrl;
    } catch (error) {
      console.error('Error taking photo', error);
      return null;
    }
  }

  uploadImage(imageData: string): Observable<any> {
    const formData = new FormData();
    const blob = this.dataURLtoBlob(imageData);
    formData.append('image', blob, 'photo.jpg');
    return this.http.post(this.apiUrl, formData);
  }

  private dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
