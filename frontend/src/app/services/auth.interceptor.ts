import { Injectable, Inject } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

//import { config } from "../services/config";
import { AuthService } from "./auth.service";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { AUTH_STRATEGY } from "./auth.strategy";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    //@Inject(AUTH_STRATEGY) private jwt: JwtAuthStrategy
    private jwt: JwtAuthStrategy
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.jwt && this.jwt.getToken()) {
      const token = this.jwt.getToken();
      if (token) {
        //request = this.addToken(request, token);
        request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.doLogoutAndRedirectToLogin();
        }
        return throwError(error);
      })
    );
  }

  // private addToken(request: HttpRequest<any>, token: string) {
  //   return request.clone({
  //     setHeaders: { Authorization: `Bearer ${token}` },
  //   });
  // }
}
