import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListingUserComponent } from './pages/listing-user/listing-user.component';
import { ListingGroupComponent } from './pages/listing-group/listing-group.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { EditGroupComponent } from './pages/edit-group/edit-group.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { WebsiteSettingsComponent } from './pages/website-settings/website-settings.component';


@NgModule({
  declarations: [
    AdminComponent,
    StatisticsComponent,
    SideBarComponent,
    ListingUserComponent,
    ListingGroupComponent,
    EditUserComponent,
    EditGroupComponent,
    StatsCardComponent,
    WebsiteSettingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
