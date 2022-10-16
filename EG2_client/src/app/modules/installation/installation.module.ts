import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallationRoutingModule } from './installation-routing.module';
import { InstallationComponent } from './installation.component';

import {StepsModule} from 'primeng/steps';
import { StartComponent } from './pages/start/start.component';
import { StepsComponent } from './pages/steps/steps.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    InstallationComponent,
    StartComponent,
    StepsComponent,
  ],
  imports: [
    CommonModule,
    InstallationRoutingModule,
    SharedModule,
    StepsModule
  ]
})
export class InstallationModule { }
