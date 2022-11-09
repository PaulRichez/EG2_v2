import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailMailboxesService } from 'src/app/core/services/email-mailboxes.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent extends AppHelperComponent implements OnInit {
  public selectedMailbox: any;
  public loadingMessages = true;
  constructor(
    private emailMailboxesService: EmailMailboxesService,
    public override route: ActivatedRoute,
  ) {
    super(route)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.changedMailbox(params['path']))
  }

  changedMailbox(path: string) {
    console.log(path)
    this.emailMailboxesService.find().subscribe({
      next: result => {
        this.selectedMailbox = result.mailboxes.find(m => m.path == path)
      },
      error: err => {

      }
    });
  }

  fetchMessages(event: any) {
    
  }

}
