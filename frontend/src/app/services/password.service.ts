import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { config } from "./config";
import { CacheService } from "./cache.service";
import { AuthStrategy, AUTH_STRATEGY } from './auth.strategy';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  // setup(email: string, code: string, password: string): Observable<void> {
  //   // never send password over HTTP GET!
  //   return this.http.post<any>(`${config['authUrl']}/setup`, {
  //     email,
  //     code,
  //     password,
  //   });
  // }

  //forprod -- JSON.stringify({...})
  requestRecovery(email: string, firstname: string, secret: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${config['authUrl']}/recoverrequest`, {
      email: email,
      firstname: firstname,
      secret: secret,
    }, { headers });
  }

  // recover(email: string, code: string, password: string): Observable<void> {
  //   // never send password over HTTP GET!
  //   return this.http.post<any>(`${config['authUrl']}/recover`, {
  //     email,
  //     code,
  //     password,
  //   });
  // }
}
