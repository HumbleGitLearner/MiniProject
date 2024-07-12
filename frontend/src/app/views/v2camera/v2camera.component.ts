import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-camera-upload',
  templateUrl: './v2camera.component.html',
  styleUrls: ['./v2camera.component.css'],
})
export class V2CameraComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  photo: string | null | undefined = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.startCamera();
  }

  async startCamera() {
    if (Capacitor.isNativePlatform()) {
      // For mobile platforms, use the Capacitor Camera plugin
      const cameraResult = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      this.photo = cameraResult.dataUrl;
    } else {
      // For web, use native getUserMedia API
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;
    }
  }

  async takePhoto() {
    if (Capacitor.isNativePlatform()) {
      const cameraResult = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      this.photo = cameraResult.dataUrl;
    } else {
      const video = this.videoElement.nativeElement;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context!.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.photo = canvas.toDataURL('image/png');
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }

  retakePhoto() {
    this.photo = null;
    this.startCamera();
  }

  uploadPhoto() {
    if (this.photo) {
      const blob = this.dataURItoBlob(this.photo);
      const formData = new FormData();
      formData.append('file', blob, 'photo.png');

      this.http.post('http://your-backend-url/upload', formData).subscribe(
        (response) => {
          console.log('Upload successful', response);
        },
        (error) => {
          console.error('Upload failed', error);
        }
      );
    }
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
