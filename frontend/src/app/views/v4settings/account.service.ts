import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { SecretApi } from "./secret.api";
import { UserApi } from "./user.api";
import { User } from "../../models/user";

@Injectable()
export class AccountService {
  constructor(private userApi: UserApi, private secretApi: SecretApi) {}

  getUsers(): Observable<User[]> {
    return this.userApi.getUsers();
  }

  createUser(user: User): Observable<void> {
    return this.userApi.createUser(user);
  }

  deleteUser(id: string): Observable<void> {
    return this.userApi.deleteUser(id);
  }
  //delete
  toggleTfa(id: string, enabled: boolean) {
    return this.userApi.patchUser(id, { tfa: enabled });
  }

  getSecret() {
    return this.secretApi.getSecret();
  }
}
