import { Injectable } from '@angular/core';
import { concatMap, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../../models/user';
import { Store } from '@ngxs/store';
import { AuthState } from '../states/stores/auth.state';

@Injectable()
export class JwtAuthStrategy {
  private readonly JWT_TOKEN = 'pemauth.token';
  private readonly PEM_TOKEN = 'pemauth.uid';

  constructor(private store: Store) {}

  doLoginUser(user: User): void {
    localStorage.setItem(this.JWT_TOKEN, user.token!);
    localStorage.setItem(this.PEM_TOKEN, String(user.id));
  }

  doLoginGUser(data: any): void {
    localStorage.setItem(this.PEM_TOKEN, data);
  }

  doLogoutUser(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.PEM_TOKEN);
  }

  getCurrentUser(): Observable<any | null> {
    return this.store.select(AuthState.getToken).pipe(
      concatMap((token) => {
        if (token) {
          const jwtToken = JSON.parse(atob(token.split('.')[1]));
          return this.store.select(AuthState.getUid).pipe(
            map((id) => {
              return { jwtToken, pemToken: id };
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  getToken() {
    const jwt = localStorage.getItem(this.JWT_TOKEN);
    const pem = localStorage.getItem(this.PEM_TOKEN);

    if (jwt == null) {
      return null;
    } else {
      return { jwtToken: jwt, pemToken: pem };
    }
  }
}
