import { NgModule } from "@angular/core";

import { SharedModule } from "../../services/materials.module";
import { AccountModule } from "./account.module";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";

@NgModule({
  imports: [SharedModule, AccountModule, SettingsRoutingModule],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
