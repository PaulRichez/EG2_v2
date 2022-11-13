import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailRoutingModule } from './mail-routing.module';
import { MailComponent } from './mail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { MailShowComponent } from './pages/mail-show/mail-show.component';


@NgModule({
  declarations: [
    MailComponent,
    MailboxComponent,
    MailShowComponent
  ],
  imports: [
    CommonModule,
    MailRoutingModule,
    SharedModule
  ]
})
export class MailModule { }
