import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngxs/store';


import { AuthService } from 'app/auth/services/auth.service';
import { JwtAuthStrategy } from 'app/auth/services/jwt-auth.strategy';
import { AuthState } from 'app/auth/states/stores/auth.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private auth: JwtAuthStrategy,
    private store: Store
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(AuthState.getToken).pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
        }
        return next.handle(request).pipe(
          catchError((error) => {
            if (error.status == 401) {
              this.authService.doLogoutAndRedirectToLogin();
            }
            return throwError(error);
          })
        );
      })
    );
  }
}
