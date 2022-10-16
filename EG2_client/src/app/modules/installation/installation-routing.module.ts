import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallationComponent } from './installation.component';
import { StartComponent } from './pages/start/start.component';
import { EmailComponent } from './pages/steps/pages/email/email.component';
import { FirstUserComponent } from './pages/steps/pages/first-user/first-user.component';
import { SiteComponent } from './pages/steps/pages/site/site.component';
import { StepsComponent } from './pages/steps/steps.component';

const routes: Routes = [
  {
    path: '', component: InstallationComponent, children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      { path: 'start', component: StartComponent },
      {
        path: 'steps', component: StepsComponent, children: [
          { path: '', redirectTo: 'site', pathMatch: 'full' },
          { path: 'site', component: SiteComponent },
          { path: 'email', component: EmailComponent },
          { path: 'first-user', component: FirstUserComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallationRoutingModule { }
