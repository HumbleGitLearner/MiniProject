import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseServices } from '../../services/expense.service';
import { config } from '../../services/config';
import { JwtAuthStrategy } from '../../services/jwt-auth.strategy';
import { MatDialog } from '@angular/material/dialog';
import { cDialogBoxComponent } from '../../services/cdialog.component';


@Component({
  selector: 'camera-upload',
  templateUrl: './v2camera.component.html',
  styleUrls: ['./v2camera.component.css'],
})
export class V2CameraComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  photo: string | null | undefined = null;
  uid: number = 0;
  today = new Date();
  constructor(
    private http: HttpClient,
    private ExpenseServices: ExpenseServices,
    private auth: JwtAuthStrategy,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.startCamera();
  }

  async startCamera() {
    if (Capacitor.isNativePlatform()) {
      // For mobile platforms
      const cameraResult = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      this.photo = cameraResult.dataUrl;
    } else {
      // For web
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
      this.ExpenseServices.uploadImage(this.photo, this.uid).subscribe(
        (response) => {
          this.dialog.open(cDialogBoxComponent, {
            data: { message: ['Upload Image', `Upload successful`] },
          });
        },
        (error) => {
          this.dialog.open(cDialogBoxComponent, {
            data: { message: ['Upload Image', `Upload failed`] },
          });
        }
      );
    }
  }
}
