import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private applications = [
    {
      label: 'Dashboard',
      icon: 'pi pi-align-center',
      outlet: 'app-dashboard'
    },
    {
      label: 'Panel admin',
      icon: 'pi pi-align-center',
      outlet: 'app-admin'
    }
  ]
  public currentApp: MenuItemExtended = this.applications[0];
  public applicationsTab: MenuItemExtended[] = [];
  constructor() {
    this.createApplicationsTab();
  }

  createApplicationsTab() {
    this.applications.forEach(a => {
      const app = { ...a, command: () => this.currentApp = app }
      this.applicationsTab.push(app)
    });
    this.currentApp = this.applicationsTab[0];
  }

}

export interface MenuItemExtended extends MenuItem {
  color?: string;
  outlet: string;
}