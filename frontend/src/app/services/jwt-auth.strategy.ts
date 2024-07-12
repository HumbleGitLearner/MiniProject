import { Observable, of } from "rxjs";
import { AuthStrategy } from "./auth.strategy";
import { Token } from "../models/token";
import { User } from "../models/user";

//export class JwtAuthStrategy implements AuthStrategy<Token> {
export class JwtAuthStrategy {
  private readonly JWT_TOKEN = 'PEM_JWT';
  private readonly PEM_TOKEN = 'PEM_UID';

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
    const token = this.getToken();
    if (token) {
      //      const encodedPayload = token.split(".")[1];
      //const payload = window.atob(encodedPayload);
      //return of(JSON.parse(payload));
      return of({
        jwtToken: JSON.parse(atob(token.jwtToken!.split('.')[1])),
        pemToken: token.pemToken,
      });
    } else {
      return of(null);
    }
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
