import { Injectable } from '@angular/core';
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
    }
  ]
  public currentApp: MenuItemExtended | null = this.applications[0];
  public applicationsTab: MenuItemExtended[] = [];
  constructor(
    public authentificationService: AuthentificationService
  ) {
    this.authentificationService.observableconnectedUser.subscribe((user) => {
      if (!user) {
        this.applicationsTab = [];
        this.currentApp = null;
      }
      else {
        this.createApplicationsTab()
      }
    })
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