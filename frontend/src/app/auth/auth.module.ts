import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthRoutingModule } from "./auth-routing.module";
import { authStrategyProvider } from "./services/auth.strategy";
import { AuthInterceptor } from "./auth.interceptor";
import { LoginComponent } from "./login.component";
import { SignupComponent } from "./signup.component";
//import { ConfirmComponent } from "./confirm.component";
import { ForRolesDirective } from "./services/for-roles.directive"; //???
import { PasswordComponent } from "./password.component";
import { RecoverComponent } from "./recover.component";
import { OAuthComponent } from "./oauth.component";
//import { OtpComponent } from "./components/otp-dialog/otp.component";//???
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    //ConfirmComponent,
    ForRolesDirective, //???
    PasswordComponent,
    RecoverComponent,
    OAuthComponent,
    //    OtpComponent, //???
  ],
  exports: [ForRolesDirective], //???
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDialogActions,
    MatDialogContent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    authStrategyProvider,
  ],
})
export class AuthModule {}
