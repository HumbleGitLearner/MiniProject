import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Subject, Subscription } from 'rxjs';
import { Photo } from '../shared/model/Photo';
import { PhotoService } from '../services/photo.service';
import { UploadService } from '../../upload.service';


@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrl: './create-photo.component.css'
})
export class CreatePhotoComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(WebcamComponent) webcam!: WebcamComponent;
  width = 400;
  height = 400;
  pics: string[] = [];
  sub$!: Subscription;
  trigger = new Subject<void>();

  employee: Photo = new Photo();
  formBuilder?: FormBuilder;
  file?: File;

  imageData = '';
  blob!: Blob;

  employeeForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.minLength(5)]),
    lastName: new FormControl(''),
    email: new FormControl(''),
    profileUrl: new FormControl(''),
    file: new FormControl(''),
    fileSource: new FormControl(''),
  });

  ngOnInit(): void {
    // this.employeeForm = this.formBuilder?.group({
    //   firstName: [''],
    //   lastName: [''],
    //   email: [''],
    //   profileUrl: ['']
    // })
  }

  constructor(
    private empSvc: PhotoService,
    private router: Router,
    private cameraSvc: UploadService,
    formBuilder: FormBuilder
  ) {
    this.formBuilder = formBuilder;
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];

      const f1 = event.target.files[0];

      this.employeeForm.patchValue({
        fileSource: f1,
      });
    }
  }

  submitSave(): void {
    console.log(
      'create-employee submitSave >>> ' +
        this.employeeForm.controls['firstName'].value
    );
    console.log(
      'create-employee submitSave >>> ' +
        this.employeeForm.controls['lastName'].value
    );
    console.log(
      'create-employee submitSave >>> ' +
        this.employeeForm.controls['email'].value
    );
    console.log(
      'create-employee submitSave >>> ' +
        this.employeeForm.controls['profileUrl'].value
    );
    console.log(
      'create-employee submitSave >>> ' +
        this.employeeForm.controls['fileSource'].value
    );
    console.log(
      'create-employee submitSave >>> ' +
        this.employeeForm.controls['fileSource'].value
    );


    // if (!this.cameraSvc.imageData) {
    //   this.router.navigate(['/']);
    //   return;
    // } else {
    //   this.imageData = this.cameraSvc.imageData;
    //   this.blob = this.dataURItoBlob(this.imageData);
    //       console.log(
    //   'create-employee submitSave >>>Image ' + this.imageData);
    // }

    this.employee.firstName = this.employeeForm.controls['firstName'].value;
    this.employee.lastName = this.employeeForm.controls['lastName'].value;
    this.employee.email = this.employeeForm.controls['email'].value;
    this.employee.profileURL = this.employeeForm.controls['profileUrl'].value;
    console.log('create-employee submitSave >>> ' + this.employee);

    const fileSourceValue = this.employeeForm.get('fileSource')?.value;

    const formData = new FormData();
    // if (fileSourceValue !== null && fileSourceValue !== undefined) {
    //   formData.append('file', fileSourceValue); 
    //         formData.append('image', fileSourceValue);
    // }
    if (this.cameraSvc.imageData) {
        this.imageData = this.cameraSvc.imageData;
        this.blob = this.dataURItoBlob(this.imageData);
        console.log('create-employee submitSave >>>Image ' + this.imageData);
      formData.append('image', this.blob);
      formData.append('file',  this.blob); 
    }else{formData.append('file', fileSourceValue);
    formData.append('image', fileSourceValue);}

    formData.append('firstName', this.employeeForm.controls['firstName'].value);
    formData.append('lastName', this.employeeForm.controls['lastName'].value);
    formData.append('email', this.employeeForm.controls['email'].value);
    
    this.empSvc.createPhotoWithS3(formData).subscribe((data) => {
      console.log('create-employee submitSaved >>> ' + data);

      this.router.navigate(['/photos']);
    });
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.webcam.trigger = this.trigger;
    this.sub$ = this.webcam.imageCapture.subscribe(this.snapshot.bind(this));

  }

  snap() {
    this.trigger.next();
  }

  snapshot(webcamImg: WebcamImage) {
    this.cameraSvc.imageData = webcamImg.imageAsDataUrl;
    this.pics.push(webcamImg.imageAsDataUrl);
  }

  dataURItoBlob(dataURI: String) {
    var byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}

