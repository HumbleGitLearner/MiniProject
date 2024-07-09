import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './views/layout/layout.component';
import { HomeComponent } from './views/v1home/home.component';
import { AppGuard } from './auth/services/app.guard';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'app',
    canActivate: [AppGuard],
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'expenses',
        loadChildren: () =>
          import('./views/expenses/expenses.module').then(
            (m) => m.ExpensesModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./views/v4settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
