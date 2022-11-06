import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailRoutingModule } from './mail-routing.module';
import { MailComponent } from './mail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MailComponent
  ],
  imports: [
    CommonModule,
    MailRoutingModule,
    SharedModule
  ]
})
export class MailModule { }
