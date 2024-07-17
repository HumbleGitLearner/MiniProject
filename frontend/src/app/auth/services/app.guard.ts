import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { CanActivate, Router } from "@angular/router";
import { Store } from '@ngxs/store';
import { AuthState } from '../states/stores/auth.state';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { Glogin } from 'app/auth/states/actions/auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { cDialogBoxComponent } from '../../services/cdialog.component';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private dialog: MatDialog,
    private auth: JwtAuthStrategy
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(AuthState.hasToken).pipe(
      switchMap((hasToken) => {
        if (!hasToken) {
          this.router.navigate([this.authService.LOGIN_PATH]);
          return of(false);
        }
        return this.auth.getCurrentUser().pipe(
          switchMap((user) => {
            const expTimestampMillis = parseInt(user.jwtToken.exp) * 1000;
            const inputDate = new Date(expTimestampMillis);
            const today = new Date();
            if (!user.pemToken) {
              return this.authService
                .signup({
                  id: 0,
                  email: user.jwtToken.email,
                  password: '',
                  secret: '',
                  givenName: user.jwtToken.given_name,
                  lastName: user.jwtToken.family_name,
                  loginType: 'GOOGLE',
                  mobile: '',
                  notifTelegram: false,
                  notifEmail: false,
                  scanEmail: false,
                  exp: Number(user.jwtToken.exp),
                })
                .pipe(
                  switchMap((response) => {
                    this.store.dispatch(new Glogin(response));
                    return of(true);
                  }),
                  catchError((error) => {
                    if (error.status === 409) {
                      this.store.dispatch(new Glogin(error.error));
                      return of(true);
                    } else {
                      return of(false);
                    }
                  })
                );
            }
            if (inputDate < today){
              const dialogRef = this.dialog.open(cDialogBoxComponent, {
                data: {
                  message: ['Token Expired', 'Please sign in again.'],
                },
              });
              this.router.navigate([this.authService.LOGIN_PATH]);
            }
            return of(!!user && inputDate >= today);
          }),
          catchError(() => of(false))
        );
      })
    );
  }
}

