import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class v2SelectimageService {
  private apiUrl = 'http://localhost:8080/api/images'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
