import { NgModule } from '@angular/core';
import { MaterialsModule } from './services/materials.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { registerLocaleData } from '@angular/common';
//import localePl from '@angular/common/locales/pl';
import { IonicModule } from '@ionic/angular'; 
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { MatNativeDateModule } from '@angular/material/core';
//import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { MatDialogModule } from '@angular/material/dialog';
//import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AuthModule } from './auth.module';
//import { DialogBoxComponent } from './services/dialog.component';

//import { MenuItemDirective } from './services/menu-item.directive';
//import { HttpErrorInterceptor } from './services/error.interceptor';
//del HttpClientInMemoryWebApiModule for production
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockApi } from './mocks/mock.api';

//import { MatInputModule } from '@angular/material/input';
//import { MatButtonModule } from '@angular/material/button';
//import { MatFormFieldModule } from '@angular/material/form-field';

//import { AuthRoutingModule } from './auth-routing.module';
import { AuthInterceptor } from './services/auth.interceptor';
import { LayoutComponent } from './views/layout/layout.component';
import { LogoutDialogComponent } from './views/layout/logout.component';

import { LoginComponent } from './authviews/login.component';
import { SignupComponent } from './authviews/signup.component';
import { RecoverComponent } from './authviews/recover.component';
import { cDialogBoxComponent } from './services/cdialog.component';
import { JwtAuthStrategy } from './services/jwt-auth.strategy';

import { HomeService } from './views/v1home/home.service';
import { V1HomeComponent } from './views/v1home/v1home.component';
// import { V1HomeComponentcopy } from './views/v1home/v1home.componentcopy';
import { copyExpenseService } from './views/v1home/home.servicecopy';
import { BudgetApi } from './views/v1home/budget.api';
import { BudgetProgressComponent } from './views/v1home/budget-progress.component';
import { SummaryComponent } from './views/v1home/summary.component';
import { V2CameraComponent } from './views/v2camera/v2camera.component';
import { V2ManualComponent } from './views/v2manual/v2manual.component';
import { V2SelectimageComponent } from './views/v2selectimage/v2selectimage.component';
import { V3ReportsComponent } from './views/v3reports/v3reports.component';
import { V4SettingsComponent } from './views/v4settings/v4settings.component';

import { ExpenseServices } from './services/expense.service';

import { v2SelectimageService } from './views/v2selectimage/v2selectimage.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { V3ReportsService } from './views/v3reports/v3reports.service';

import { CacheService } from './services/cache.service';
//import { HttpErrorHandler } from './services/error.handler';
import { ConfigProvider } from './services/config.provider';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

//import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';

//registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,

    //  MenuItemDirective,

    LoginComponent,
    SignupComponent,
    RecoverComponent,
    cDialogBoxComponent,
    LogoutDialogComponent,
    V1HomeComponent,
    // V1HomeComponentcopy,
    SummaryComponent,
    BudgetProgressComponent,
    V2CameraComponent,
    V2ManualComponent,
    V2SelectimageComponent,
    V3ReportsComponent,
    V4SettingsComponent,

    V2CameraComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-Token',
      headerName: 'XSRF-Token',
    }),
    //New, to delete for production
    // HttpClientInMemoryWebApiModule.forRoot(MockApi, {
    //   passThruUnknownUrl: true,
    //   delay: 1000,
    // }),
    BrowserAnimationsModule,
    //MatProgressBarModule,
    MaterialsModule,
    RouterModule,
    //MatNativeDateModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    //AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //MatButtonModule,
    //MatFormFieldModule,
    //MatInputModule,
    //MatDialogModule,
    //MatCheckboxModule,
    //MatDialogActions,
    //MatDialogContent,
    IonicModule.forRoot(), // Add this import
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    NgxChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    JwtAuthStrategy,

    HomeService,
    copyExpenseService,
    BudgetApi,
    CacheService,
    ConfigProvider,
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
  ],
  exports: [LayoutComponent, V1HomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
