import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../states/stores/auth.state';
import { map, Observable, of, combineLatest } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.store.select(AuthState.hasToken),
      this.store.select(AuthState.hasUid),
    ]).pipe(map(([hasToken, hasUid]) => {
        if (hasToken && hasUid) {
          this.router.navigate([this.authService.HOME_PATH]);
          return false;
        }
        return true;
      })
    );
  }
}
