import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsFirstInstallGuard } from './core/guard/installation/is-first-install.guard';
import { IsNotFirstInstallGuard } from './core/guard/installation/is-not-first-install.guard';
import { IsLoggedGuard } from './core/guard/login/is-logged.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), canActivate: [IsNotFirstInstallGuard] },
  { path: 'setup', loadChildren: () => import('./modules/installation/installation.module').then(m => m.InstallationModule), canActivate: [IsFirstInstallGuard] },
  {
    path: '**', pathMatch: 'full',
    component: NotFoundComponent
  },
  { path: 'dashboard', outlet: 'app-dashboard', loadChildren: () => import('./modules/applications/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [IsLoggedGuard] },
  { path: 'admin', outlet: 'app-admin', loadChildren: () => import('./modules/applications/admin/admin.module').then(m => m.AdminModule), canActivate: [IsLoggedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
