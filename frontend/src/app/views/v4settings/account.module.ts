import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { SharedModule } from "../../services/materials.module";
import { AccountComponent } from "./account.component";
import { UserDialogComponent } from "./user-dialog.component";
import { SecretDialogComponent } from "./secret-dialog.component";
import { AccountService } from "./account.service";
import { UserApi } from "./user.api";
import { SecretApi } from "./secret.api";

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, FormsModule],
  declarations: [AccountComponent, UserDialogComponent, SecretDialogComponent],
  providers: [AccountService, UserApi, SecretApi],
})
export class AccountModule {}
