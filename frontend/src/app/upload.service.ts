
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UploadResult } from './temp/shared/model/upload-result';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // TODO: Task 3.
  // You may add add parameters to the method
  imageData = ""
  
  constructor(private httpClient: HttpClient) { }

  upload(form :  any , image: Blob){
    const formData = new FormData();
    formData.set("title", form['title']);
    formData.set("complain", form['complain']);
    formData.set("imageFile", image);
    
    return firstValueFrom(this.httpClient.post<UploadResult>("/api/image/upload",formData));
  }

  getImage(postId: string) {
    return firstValueFrom(
      this.httpClient.get<UploadResult>('/api/image/get' + postId)
    );
  }
}
