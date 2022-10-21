import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent extends AppHelperComponent implements OnInit {
  public items!: MenuItem[];
  constructor(public override route: ActivatedRoute) {
    super(route);
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Stats',
        icon: 'fa-solid fa-chart-bar',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['admin', 'stats'] } }]
        // visible: this.apiAuthService.checkpermission('admin-monitoring'),
      },
      {
        label: 'Listing Users',
        icon: 'fa-solid fa-users',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['admin', 'listing-user'] } }]
      },
      {
        label: 'Listing Groups',
        icon: 'fa-solid fa-user-group',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['admin', 'listing-group'] } }],
      },
      {
        label: 'Paramètres du site',
        icon: 'fa-solid fa-gears',
        routerLink: ['', { outlets: { [this.appOutlet as string]: ['admin', 'website-settings'] } }],
      },
    ];
  }

}
