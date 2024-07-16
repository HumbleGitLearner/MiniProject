import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { LayoutComponent } from './views/layout/layout.component';
import { AppGuard } from './auth/services/app.guard';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { RecoverComponent } from './auth/recover.component';
import { V1HomeComponent } from './views/v1home/v1home.component';
import { V2CameraComponent } from './views/v2camera/v2camera.component';
import { V2ManualComponent } from './views/v2manual/v2manual.component';
import { V2SelectimageComponent } from './views/v2selectimage/v2selectimage.component';
import { V3ReportsComponent } from './views/v3reports/v3reports.component';
import { V4SettingsComponent } from './views/v4settings/v4settings.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recover',
    component: RecoverComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'app',
    canActivate: [AppGuard],
    component: LayoutComponent,
    children: [
      { path: 'home', component: V1HomeComponent },
      { path: 'settings', component: V4SettingsComponent },
      { path: 'reports', component: V3ReportsComponent },
      { path: 'camera', component: V2CameraComponent },
      { path: 'manual', component: V2ManualComponent },
      { path: 'selectimage', component: V2SelectimageComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule], 
})
export class AppRoutingModule {}
