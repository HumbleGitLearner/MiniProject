import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { config } from 'app/services/config';
import { JwtAuthStrategy } from 'app/auth/services/jwt-auth.strategy';

@Injectable({
  providedIn: 'root',
})
export class v2SelectimageService {

  constructor(private http: HttpClient, private auth: JwtAuthStrategy) {}

  uploadImage(formData: FormData): Observable<any> {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        if (user) {
          return this.http.post(
            `${config['expensesUrl']}/upload/${user.pemToken}`, formData);
        } else {
          throw new Error('User not found');
        }
      })
    );
  }
}
