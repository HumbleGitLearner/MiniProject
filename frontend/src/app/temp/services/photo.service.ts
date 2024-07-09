
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../shared/model/Photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  //private baseURL = "http://localhost:3000/api";
  private baseURL = '/api';

  constructor(private httpClient: HttpClient) {}

  getPhotoList(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(`${this.baseURL}`);
  }

  createPhoto(Photo: Photo): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, Photo);
  }

  createPhotoWithS3(formData: FormData): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` + '/image/upload', formData);
  }

  getPhotoById(id: number): Observable<Photo> {
    return this.httpClient.get<Photo>(`${this.baseURL}/${id}`);
  }

  deletePhotoById(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  updatePhotoById(id: number, Photo: Photo): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, Photo);
  }
}
