import { User } from "./user";

export class Account {
  constructor(public id: string | number | undefined, users: User[] = []) {}
}
