import { NgModule } from '@angular/core';
import { SharedModule } from './services/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { LogoutDialogComponent } from './views/layout/logout.component';

import { DialogBoxComponent } from './services/dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './views/layout/layout.component';
import { HomeService } from './views/v1home/home.service';
import { HomeComponent } from './views/v1home/home.component';
import { SummaryComponent } from './views/v1home/summary.component';

import { BudgetApi } from './views/v1home/budget.api';
import { BudgetProgressComponent } from './views/v1home/budget-progress.component';

import { MenuItemDirective } from './services/menu-item.directive';
import { HttpErrorInterceptor } from './services/error.interceptor';
//del HttpClientInMemoryWebApiModule for production
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockApi } from './mocks/mock.api';

import { CacheService } from './services/cache.service';
import { HttpErrorHandler } from './services/error.handler';
import { ConfigProvider } from './services/config.provider';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,

    MenuItemDirective,
    HomeComponent,
    SummaryComponent,
    BudgetProgressComponent,
    LogoutDialogComponent,
    RecoverDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-Token',
      headerName: 'XSRF-Token',
    }),
    BrowserAnimationsModule,
    MatProgressBarModule,
    SharedModule,
    RouterModule,
    MatNativeDateModule,
    //New, to delete for production
    HttpClientInMemoryWebApiModule.forRoot(MockApi, {
      passThruUnknownUrl: true,
      delay: 1000,
    }),
    AuthModule,
    AppRoutingModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  providers: [
    HomeService,
    BudgetApi,
    CacheService,
    ConfigProvider,
    HttpErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  exports: [LayoutComponent, HomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
