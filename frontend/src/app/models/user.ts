import { Account } from "./account";
import { Role } from "./types";

export class User {
  id!: string;

  accountId?: string;
  account?: Account;

  email?: string; //for login name
  password?: string;
  token?: string;
  secret?: string;
  first_name?: string;
  last_name?: string;
  loginType?: string; //LOCAL, GOOGLE, GITHUB, HOTMAIL

  mobile?: string; //for telegram
  lastMod?: string;

  notif_telegram?: boolean;
  notif_email?: boolean;
  scan_email?: boolean;
  exp?: string;

  //description?: StorageManager;

  iat?: string;
  iss?: string;

//  role!: Role;
  confirmed?: boolean;
  //delete
  tfa?: boolean;
}
