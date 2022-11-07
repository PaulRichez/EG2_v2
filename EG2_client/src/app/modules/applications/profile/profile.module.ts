import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MyProfileComponent,
    MySettingsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
