import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailComponent } from './mail.component';
import { MailboxComponent } from './pages/mailbox/mailbox.component';


const routes: Routes = [
  {
    path: '', component: MailComponent, children: [
      { path: 'mailbox/:path', component: MailboxComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailRoutingModule { }
