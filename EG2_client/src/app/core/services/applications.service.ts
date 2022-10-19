import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthentificationService } from '../authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private applications = [
    {
      label: 'Dashboard',
      icon: 'fa fa-chart-line',
      outlet: 'app-dashboard'
    },
    {
      label: 'Panel admin',
      icon: 'fa fa-hammer',
      outlet: 'app-admin'
    },
    {
      label: 'Profile',
      visible: false,
      outlet: 'app-profile'
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
      if (!user) {
        this.applicationsTab = [];
        this.currentApp = null;
        this.resetAllRouterOutlets();
      }
      else {
        this.createApplicationsTab()
      }
    })
  }

  createApplicationsTab() {
    this.applications.forEach(a => {
      const app = {
        ...a, command: () => {
          this.selectApp(a.outlet)
        }
      }
      this.applicationsTab.push(app)
    });
    this.selectApp('dashboard')
  }

  selectApp(name: string) {
    let outlet = name;
    if (!name.startsWith("app-")) {
      outlet = 'app-' + name;
    }
    const app = this.applicationsTab.find(a => a.outlet === outlet);
    if (app) {
      this.createRouterOutlet(app.outlet)
      this.currentApp = app;
    }
  }

  private createRouterOutlet(outlet: string, childrens?: any) {
    if (!childrens) {
      childrens = (this.route.snapshot as any)._routerState._root.children
    }
    const children = childrens.find((a: any) => a.value.outlet === outlet);
    let page = outlet;
    if (outlet.startsWith("app-")) {
      page = outlet.substring(4)
    }
    if (!children) {
      this.router.navigate([{ outlets: { ['primary']: '', [outlet]: [page] } }])
    }
  }

  public resetAllRouterOutlets() {
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
  color?: string;
  outlet: string;
}