import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from 'src/app/core/guard/login/is-logged.guard';
import { TabComponent } from './tab.component';

/*const preRoute: Route =
{
  path: '', component: TabComponent,
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    {
      path: 'dashboard',
      loadChildren: () => import('../../modules/applications/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [IsLoggedGuard]
    },
    {
      path: 'contact',
      loadChildren: () => import('../../modules/applications/contact/contact.module').then(m => m.ContactModule),
      canActivate: [IsLoggedGuard]
    },
    {
      path: 'admin',
      loadChildren: () => import('../../modules/applications/admin/admin.module').then(m => m.AdminModule),
      canActivate: [IsLoggedGuard]
    },
    {
      path: 'admin-sidebar',
      loadChildren: () => import('../../modules/applications/admin/side-bar/side-bar.module').then(m => m.SideBarModule),
      canActivate: [IsLoggedGuard]
    },
    {
      path: 'profile',
      loadChildren: () => import('../../modules/applications/profile/profile.module').then(m => m.ProfileModule),
      canActivate: [IsLoggedGuard]
    }
  ]
};

const routes: Routes = [];
for (let i = 0; i < 10; i++) {
  let preR = Object.assign({}, preRoute);
  preR.outlet = 'tab_' + i
  routes.push(preR)
}

console.log(routes)*/

const routes: Routes = [{
  path: '', component: TabComponent,
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    {
      path: 'dashboard',
      loadChildren: () => import('../../modules/applications/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [IsLoggedGuard]
    },
    {
      path: 'contact',
      loadChildren: () => import('../../modules/applications/contact/contact.module').then(m => m.ContactModule),
      canActivate: [IsLoggedGuard]
    },
    {
      path: 'admin',
      loadChildren: () => import('../../modules/applications/admin/admin.module').then(m => m.AdminModule),
      canActivate: [IsLoggedGuard]
    },
    {
      path: 'admin-sidebar',
      loadChildren: () => import('../../modules/applications/admin/side-bar/side-bar.module').then(m => m.SideBarModule),
      canActivate: [IsLoggedGuard]
    },
    {
      path: 'profile',
      loadChildren: () => import('../../modules/applications/profile/profile.module').then(m => m.ProfileModule),
      canActivate: [IsLoggedGuard]
    }
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabRoutingModule { }
