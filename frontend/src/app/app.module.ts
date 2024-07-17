import { NgModule, isDevMode } from '@angular/core';
import { MaterialsModule } from './services/materials.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular'; 
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './services/auth.interceptor';

import { JwtAuthStrategy } from './auth/services/jwt-auth.strategy';
import { ExpenseServices } from './services/expense.service';
import { UserServices } from './services/user.service';

import { HomeService } from './services/home.service';

import { LayoutComponent } from './views/layout/layout.component';
import { LogoutDialogComponent } from './views/layout/logout.component';
import { cDialogBoxComponent } from './services/cdialog.component';
import { ImageDialogBoxComponent } from './services/imagedialog.component';

import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { RecoverComponent } from './auth/recover.component';
import { V1HomeComponent } from './views/v1home/v1home.component';
import { V2CameraComponent } from './views/v2camera/v2camera.component';
import { V2ManualComponent } from './views/v2manual/v2manual.component';
import { V2SelectimageComponent } from './views/v2selectimage/v2selectimage.component';
import { V3ReportsComponent } from './views/v3reports/v3reports.component';
import { v3ReportTabComponent } from './views/v3reports/v3reports-tab.component';
import { V4SettingsComponent } from './views/v4settings/v4settings.component';

import { CacheService } from './services/cache.service';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth/states/stores/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FilterEmptyFileUrlPipe } from './services/expense.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,

    LoginComponent,
    SignupComponent,
    RecoverComponent,
    cDialogBoxComponent,
    LogoutDialogComponent,
    V1HomeComponent,
    V2CameraComponent,
    V2ManualComponent,
    V2SelectimageComponent,
    V3ReportsComponent,
    V4SettingsComponent,
    v3ReportTabComponent,
    ImageDialogBoxComponent,
    FilterEmptyFileUrlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-Token',
      headerName: 'XSRF-Token',
    }),
    BrowserAnimationsModule,
    MaterialsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NgxChartsModule,
    NgxsModule.forRoot([AuthState]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    // NgxsStoragePluginModule.forRoot({
    //   keys: ['auth.token','auth.uid','auth.isAuthenticated'],
    // }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    JwtAuthStrategy,
    CacheService,
    provideAnimationsAsync(),
    ExpenseServices,
    UserServices,
    HomeService,
  ],
  exports: [LayoutComponent, FilterEmptyFileUrlPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
