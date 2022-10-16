import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallationComponent } from './installation.component';
import { StartComponent } from './pages/start/start.component';
import { StepsComponent } from './pages/steps/steps.component';

const routes: Routes = [
  {
    path: '', component: InstallationComponent, children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      { path: 'start', component: StartComponent },
      { path: 'steps', component: StepsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallationRoutingModule { }
