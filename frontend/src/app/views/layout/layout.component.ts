import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import {
  Router,
} from "@angular/router";
import { Location } from "@angular/common";
import { Subscription, Observable } from "rxjs";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "app/auth/services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout.component';
import { Store } from "@ngxs/store";
import { Logout } from "app/auth/states/actions/auth.actions";

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
}) 
export class LayoutComponent implements AfterViewInit {
  public loadingRoute = false;
  public userEmail$: Observable<string | undefined>;
  public uId: number | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private location: Location,
    private authService: AuthService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private store: Store
  ) {
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/home.svg')
    );
    iconRegistry.addSvgIcon(
      'list',
      sanitizer.bypassSecurityTrustResourceUrl('assets/list.svg')
    );
    iconRegistry.addSvgIcon(
      'manual',
      sanitizer.bypassSecurityTrustResourceUrl('assets/manual.svg')
    );
    iconRegistry.addSvgIcon(
      'reports',
      sanitizer.bypassSecurityTrustResourceUrl('assets/reports.svg')
    );
    iconRegistry.addSvgIcon(
      'file',
      sanitizer.bypassSecurityTrustResourceUrl('assets/file.svg')
    );
    iconRegistry.addSvgIcon(
      'camera',
      sanitizer.bypassSecurityTrustResourceUrl('assets/camera.svg')
    );
    iconRegistry.addSvgIcon(
      'logout',
      sanitizer.bypassSecurityTrustResourceUrl('assets/logout.svg')
    );
    iconRegistry.addSvgIcon(
      'settings',
      sanitizer.bypassSecurityTrustResourceUrl('assets/settings.svg')
    );

    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg')
    );
    iconRegistry.addSvgIcon(
      'remove',
      sanitizer.bypassSecurityTrustResourceUrl('assets/remove.svg')
    );

    this.userEmail$ =
      this.authService.getUserFirstname$() !== undefined
        ? this.authService.getUserFirstname$()
        : this.authService.getUserEmail$();

    this.uId = 1;
  }

  logout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(new Logout()).subscribe(() => {
          console.error('logout =====');
          this.router.navigate([this.authService.LOGIN_PATH]);
        });
      }
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}