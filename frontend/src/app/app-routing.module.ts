import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LayoutComponent } from './views/layout/layout.component';
import { AppGuard } from './services/app.guard';
import { LoginComponent } from './authviews/login.component';
import { SignupComponent } from './authviews/signup.component';
import { RecoverComponent } from './authviews/recover.component';
//import { MatCardModule } from '@angular/material/card';
import { V1HomeComponent } from './views/v1home/v1home.component';
import { V2CameraComponent } from './views/v2camera/v2camera.component';
import { V2ManualComponent } from './views/v2manual/v2manual.component';
import { V2SelectimageComponent } from './views/v2selectimage/v2selectimage.component';
import { V3ReportsComponent } from './views/v3reports/v3reports.component';
import { V4SettingsComponent } from './views/v4settings/v4settings.component';

//import { MatDialogModule } from '@angular/material/dialog';
//import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
//import { V4SettingComponent } from './temp/v4-setting/v4-setting.component';

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
      {
        path: 'expenses',
        loadChildren: () =>
          import('./views/expenses/expenses.module').then(
            (m) => m.ExpensesModule
          ),
      },
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
    // MatDialogModule,
    // MatDialogActions,
    // MatDialogContent,
  ],
  exports: [RouterModule], //, MatCardModule],
})
export class AppRoutingModule {}
