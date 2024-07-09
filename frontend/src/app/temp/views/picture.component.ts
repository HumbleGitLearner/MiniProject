import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; // Adjust the path
import { UploadService } from '../../upload.service';


@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})
export class PictureComponent  implements OnInit {

  // TODO: Task 2
  // TODO: Task 3
  imageData = ""
  form!: FormGroup;
  blob!: Blob;

  constructor(private router: Router, private fb: FormBuilder,
      private cameraSvc : UploadService, private dialog: MatDialog){

  }
  ngOnInit(): void {
      if(!this.cameraSvc.imageData){
        this.router.navigate(['/'])
        return;
      }
      this.imageData = this.cameraSvc.imageData;
      this.form = this.fb.group(
        {
          title: this.fb.control<string>('', [Validators.minLength(5)]),
          complain: this.fb.control<string>(''),
        }
      );
      this.blob = this.dataURItoBlob(this.imageData);
   }
   upload(){
    const formVal = this.form.value;
    this.cameraSvc.upload(formVal, this.blob).then((result)=>{
      console.log("After successfully uploading the file ");   
      // const userConfirmed = window.confirm('The file has been successfully uploaded.\n'
      //   +'Back to the previous/main page ?\n'+'If not, stay at this page.');
      // if (userConfirmed) { // User clicked OK
      //   console.log('User back to mainComponent.');
      //   this.router.navigate(['/']);
      // } else {  // User clicked Cancel
      //   console.log('User stay at pictureComponent.');
      // }
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '300px',
        data: { message: 'The file has been successfully uploaded.\nBack to the previous/main page ?\n If not, stay at this page.' }
      });  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {          // User clicked OK
          console.log('User back to mainComponent.');
          this.router.navigate(['/']);
        } else {          // User clicked Cancel
          console.log('User stay at pictureComponent.');
        }
      });  
    }).catch(error=> {
      console.error(error);
    })
  }

  //This method is used to convert a data URI (Base64 encoded image) to a Blob object.
  // This is useful for handling file uploads and other operations where a binary representation of the image is needed.
  dataURItoBlob(dataURI: String){
    // a real value example of the property WebcamComponent.imageAsDataUrl
    // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAALQCAIAAAAY6Np1AAAAGXRFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA0LjA8P...
    //atob() decodes the Base64 string to a binary string.
    var byteString = atob(dataURI.split(',')[1]); //iVBORw0KGgoAAAANSUhEUgAAAoAAAALQCAIAAAAY6Np1AAAAGXRFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA0LjA8P
    let mimeString = dataURI.split(',')[0].split(';')[0];//data:image/png
    //An ArrayBuffer is created to hold the binary data.
    var ab = new ArrayBuffer(byteString.length)
    //A Uint8Array is created to work with the ArrayBuffer.
    var ia = new Uint8Array(ab)
    //Filling the Uint8Array: This loop goes through each character of the binary string (byteString).
    // charCodeAt(i) gets the Unicode value of the character at index i.
    // These values are stored in the Uint8Array (ia).
    for(var i =0; i <byteString.length; i++){
      ia[i] = byteString.charCodeAt(i);
    }
    //Creating the Blob:
    //     A new Blob is created from the ArrayBuffer (ab).
    // The MIME type (mimeString) is passed as a property to the Blob.
     return new Blob([ab], {type: mimeString});
  }
}