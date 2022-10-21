import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  public items: MenuItem[] = [
    {
      label: 'Stats',
      icon: 'fa-solid fa-chart-bar',
      routerLink: ['/admin/stats'],
      // visible: this.apiAuthService.checkpermission('admin-monitoring'),
    },
    {
      label: 'Listing Users',
      icon: 'fa-solid fa-users',
      routerLink: ['/admin/listing-users'],
    },
    {
      label: 'Listing Groups',
      icon: 'fa-solid fa-user-group',
      routerLink: ['/admin/listing-groups'],
    },
    {
      label: 'Paramètres du site',
      icon: 'fa-solid fa-gears',
      routerLink: ['/admin/website-settings'],
    },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
