import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailRoutingModule } from './mail-routing.module';
import { MailComponent } from './mail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { MailShowComponent } from './pages/mail-show/mail-show.component';
import { MessageAttachmentsComponent } from './component/message-attachments/message-attachments.component';
import { MessageHeaderComponent } from './component/message-header/message-header.component';
import { MessageContentComponent } from './component/message-content/message-content.component';


@NgModule({
  declarations: [
    MailComponent,
    MailboxComponent,
    MailShowComponent,
    MessageAttachmentsComponent,
    MessageHeaderComponent,
    MessageContentComponent
  ],
  imports: [
    CommonModule,
    MailRoutingModule,
    SharedModule
  ]
})
export class MailModule { }
