import { NgModule } from '@angular/core';
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
//import { HttpErrorInterceptor } from './services/error.interceptor';
import { AuthInterceptor } from './services/auth.interceptor';

import { JwtAuthStrategy } from './services/jwt-auth.strategy';
import { ExpenseServices } from './services/expense.service';
import { UserServices } from './services/user.service';

//import { HomeService } from './views/v1home/home.service';
import { v2SelectimageService } from './views/v2selectimage/v2selectimage.service';
import { V3ReportsService } from './views/v3reports/v3reports.service';
import { HomeService } from './views/v1home/home.service';


//import { BudgetApi } from './views/v1home/budget.api';
//import { BudgetProgressComponent } from './views/v1home/budget-progress.component';
//import { SummaryComponent } from './views/v1home/summary.component';

import { LayoutComponent } from './views/layout/layout.component';
import { LogoutDialogComponent } from './views/layout/logout.component';
import { cDialogBoxComponent } from './services/cdialog.component';

import { LoginComponent } from './authviews/login.component';
import { SignupComponent } from './authviews/signup.component';
import { RecoverComponent } from './authviews/recover.component';
import { V1HomeComponent } from './views/v1home/v1home.component';
import { V2CameraComponent } from './views/v2camera/v2camera.component';
import { V2ManualComponent } from './views/v2manual/v2manual.component';
import { V2SelectimageComponent } from './views/v2selectimage/v2selectimage.component';
import { V3ReportsComponent } from './views/v3reports/v3reports.component';
import { V4SettingsComponent } from './views/v4settings/v4settings.component';

import { CacheService } from './services/cache.service';
//import { ConfigProvider } from './services/config.provider';

// import { MatButtonModule } from '@angular/material/button';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,

    LoginComponent,
    SignupComponent,
    RecoverComponent,
    cDialogBoxComponent,
    LogoutDialogComponent,

//    SummaryComponent,
//    BudgetProgressComponent,

    V1HomeComponent,
    V2CameraComponent,
    V2ManualComponent,
    V2SelectimageComponent,
    V3ReportsComponent,
    V4SettingsComponent,
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
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    // MatButtonModule,
    // MatTabsModule,
    // MatTableModule,
    NgxChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    JwtAuthStrategy,

    // HomeService,
    // BudgetApi,
    CacheService,
    //ConfigProvider,
    //  HttpErrorHandler,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptor,
    //  multi: true,
    // },
    provideAnimationsAsync(),
    V3ReportsService,
    v2SelectimageService,
    
    ExpenseServices,
    UserServices,
    HomeService
  ],
  exports: [LayoutComponent, V1HomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
