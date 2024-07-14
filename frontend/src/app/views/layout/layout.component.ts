import {
  Component,
  ViewChildren,
  QueryList,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import {
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationError,
  NavigationCancel,
  ActivationStart,
} from "@angular/router";
import { Location } from "@angular/common";
import { Subscription, Observable } from "rxjs";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
//import { MenuItemDirective } from "../../services/menu-item.directive";
import { AuthService } from "../../services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout.component';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit//, OnDestroy
{
//  @ViewChildren(MenuItemDirective)
  //private buttons!: QueryList<MenuItemDirective>;
  //private routerSub: Subscription;
  public loadingRoute = false;
  public userEmail$: Observable<string | undefined>;
  public uId: number | undefined;
  //public selected!: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private location: Location,
    private authService: AuthService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dialog: MatDialog
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

    // this.routerSub = router.events.subscribe((e) => {
    //   if (e instanceof NavigationStart || e instanceof ActivationStart) {
    //     this.loadingRoute = true;
    //   } else if (
    //     e instanceof NavigationEnd ||
    //     e instanceof NavigationError ||
    //     e instanceof NavigationCancel
    //   ) {
    //     this.loadingRoute = false;

    //     this.selectCurrentRoute();
    //   }
    // });

    this.userEmail$ =
      this.authService.getUserFirstname$() !== undefined
        ? this.authService.getUserFirstname$()
        : this.authService.getUserEmail$();
    
    this.uId = 1;
  }

 // private selectCurrentRoute() {
 //   this.select(this.location.path().split('/')[2]);
  // }

  // private select(name: string) {
  //   if (this.buttons) {
  //     this.buttons.forEach(
  //       (button) => (button.isSelected = button.name === name)
  //     );
  //   }
  //   this.selected = name;
  // }

  logout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.authService.logout().subscribe(() => {
          this.router.navigate([this.authService.LOGIN_PATH]);
        });
      } else {
      }
    });
  }

  ngAfterViewInit() {
    // this.selectCurrentRoute();
    this.cdr.detectChanges();
  }

  // ngOnDestroy() {
  //   this.routerSub.unsubscribe();
  // }
}