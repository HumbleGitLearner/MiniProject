import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login.component";
import { SignupComponent } from "./signup.component";
//import { ConfirmComponent } from "./confirm.component";
import { PasswordComponent } from "./password.component";
import { RecoverComponent } from "./recover.component";
import { OAuthComponent } from "./oauth.component";
import { AuthGuard } from "./services/auth.guard";
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: "confirm",
  //   component: ConfirmComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: "password",
  //   component: PasswordComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: "recover",
    component: RecoverComponent,
    canActivate: [AuthGuard],
  },
  //delete
  {
    path: "oauth",
    component: OAuthComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
  ],
  exports: [RouterModule, MatCardModule],
})
export class AuthRoutingModule {}
