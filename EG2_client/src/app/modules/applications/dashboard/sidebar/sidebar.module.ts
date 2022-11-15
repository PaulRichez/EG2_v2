import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { MailCounterComponent } from './components/mail-counter/mail-counter.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SidebarComponent,
    MailCounterComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    SharedModule
  ]
})
export class SidebarModule { }
