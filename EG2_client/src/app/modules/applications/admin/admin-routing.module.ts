import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditGroupComponent } from './pages/edit-group/edit-group.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListingGroupComponent } from './pages/listing-group/listing-group.component';
import { ListingUserComponent } from './pages/listing-user/listing-user.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'stats', pathMatch: 'full' },
      { path: 'stats', component: StatisticsComponent },
      { path: 'users', component: ListingUserComponent },
      { path: 'groups', component: ListingGroupComponent },
      { path: 'user', component: EditUserComponent },
      { path: 'group', component: EditGroupComponent },
      { path: 'user/:id', component: EditUserComponent },
      { path: 'group/:id', component: EditGroupComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
