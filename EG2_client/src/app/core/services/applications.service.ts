import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthentificationService } from '../authentification/authentification.service';
import { uid } from 'uid';
import { IsLoggedGuard } from '../guard/login/is-logged.guard';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  public applicaitonChangeSubject = new BehaviorSubject<{ app: MenuItemExtended, index: number } | null>(null);
  public readonly applications: MenuItemExtended[] = [
    {
      appId: 'dashboard',
      label: 'Dashboard',
      icon: 'fa fa-chart-line',
      unique: true,
      route: {
        path: 'dashboard',
        outlet: 'app-dashboard',
        loadChildren: () => import('../../modules/applications/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [IsLoggedGuard]
      },

    },
    {
      appId: 'admin',
      label: 'Panel admin',
      icon: 'fa fa-hammer',
      route: {
        path: 'admin',
        outlet: 'app-admin',
        loadChildren: () => import('../../modules/applications/admin/admin.module').then(m => m.AdminModule),
        canActivate: [IsLoggedGuard]
      },
    },
    {
      appId: 'profile',
      label: 'Profile',
      icon: 'fa fa-address-card',
      invisible: true,
      unique: true,
      route: {
        path: 'profile',
        outlet: 'app-profile',
        loadChildren: () => import('../../modules/applications/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [IsLoggedGuard]
      },
    }
  ]
  public currentApp: MenuItemExtended | null = this.applications[0];
  public applicationsTab: MenuItemExtended[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authentificationService: AuthentificationService,
  ) {
    this.authentificationService.observableconnectedUser.subscribe((user) => {
      if (!user && user !== undefined) {
        this.applicationsTab = [];
        this.currentApp = null;
        this.resetAllRouterOutlets();
      }
      else if (user !== undefined) {
        this.openNewApplication('dashboard');
      }
    })
  }

  openNewApplication(appId: string, selectIfExists?: boolean) {
    if (selectIfExists) {
      const app = this.applicationsTab.find(a => a.appId == appId);
      if (app) {
        this.selectApp(app);
        return;
      }
    }
    const app = Object.assign({}, this.applications.find(a => a.appId == appId));
    if (!app) {
      console.error('Application to open : ' + appId + ' not found')
      return;
    }
    if (app.unique) {
      const appExists = this.applicationsTab.find(a => a.appId === appId);
      if (appExists) {
        this.selectApp(appExists);
        return;
      }
    }
    app.uid = uid();
    app.route = Object.assign({}, app.route);
    app.route.outlet = app.appId + '_' + app.uid;
    app.command = () => this.selectApp(app);
    this.applicationsTab.push(app)
    this.selectApp(app)
  }

  selectApp(app: MenuItemExtended) {
    if (!this.applicationsTab.find(a => a.uid == app.uid)) {
      console.error('Application to select : ' + app.appId + ' ' + app.uid + ' not found')
      return;
    }
    this.createRouterOutlet(app)
    this.currentApp = app;
    const index = this.applicationsTab.findIndex(a => a.uid == app.uid)
    this.applicaitonChangeSubject.next({ app, index });
  }

  closeApp(app: MenuItemExtended) {
    if (this.applicationsTab.length == 1) {
      console.error('Cant close last app open')
      return;
    }
    const appIndex = this.applicationsTab.findIndex(a => a.uid == app.uid);
    if (app.uid === this.currentApp?.uid) {
      if (appIndex == this.applicationsTab.length - 1) {
        const newIndex = appIndex - 1;
        this.selectApp(Object.assign({}, this.applicationsTab[newIndex]))
      }
    }
    this.router.navigate([{ outlets: { ['primary']: '', [app.route.outlet as string]: null } }])
    this.applicationsTab.splice(appIndex, 1);
  }

  private createRouterOutlet(app: MenuItemExtended, childrens?: any) {
    if (!childrens) {
      childrens = (this.route.snapshot as any)._routerState._root.children
    }
    const children = childrens.find((a: any) => a.value.outlet === app.route.outlet);
    if (!children || this.applicationsTab.find((a: any) => a.outlet === app.route.outlet)?.visible == false) {
      const routes = this.router.config;
      routes.push(app.route);
      this.router.resetConfig(routes);
      this.router.navigate([{ outlets: { ['primary']: '', [app.route.outlet as string]: null } }]).then(() => {
        this.router.navigate([{ outlets: { ['primary']: '', [app.route.outlet as string]: [app.route.path] } }])
      })
    }
  }

  public resetAllRouterOutlets() {
    console.log('resetoutlet')
    const childrens = (this.route.snapshot as any)._routerState._root.children
    let router: any = {};
    childrens.forEach((a: any) => {
      router[a.value.outlet] = null
    })
    if (router) {
      this.router.navigate(['', { outlets: router }])
    }
  }

}

export interface MenuItemExtended extends MenuItem {
  route: Route;
  appId: string;
  uid?: string;
  invisible?: boolean;
  unique?: boolean;
}