import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-message-header',
  templateUrl: './message-header.component.html',
  styleUrls: ['./message-header.component.scss']
})
export class MessageHeaderComponent extends AppHelperComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768;
    this.getMenuInline();
    this.getItemsExtend();
  }
  isMobile = window.innerWidth < 768;
  @Input() mail!: any;
  menuInline: any[] = [];
  menuExtend: MenuItem[] = [];
  constructor(
    private router: Router,
    public override route: ActivatedRoute,
  ) {
    super(route)
  }

  ngOnInit(): void {
    this.getMenuInline();
    this.getItemsExtend();
  }
  getMenuInline() {
    if (this.isMobile) {
      this.menuInline = this.getCmMenu().splice(0, 1);
    } else {
      this.menuInline = this.getCmMenu().splice(0, 3);
    }
  }
  getItemsExtend() {
    if (this.isMobile) {
      this.menuExtend = this.getCmMenu().splice(1);
    } else {
      this.menuExtend = this.getCmMenu().splice(3);
    }
  }

  private getCmMenu() {
    return [
      {
        label: 'Répondre',
        icon: 'fa-solid fa-reply',
        command: () => {
          this.router.navigate([{ outlets: { [this.outlet as string]: ['tab', 'mail', 'compose', this.mail.id, 'reply'] } }])
        }
      },
      {
        label: 'Répondre à tous',
        icon: 'fa-solid fa-reply-all',
        command: () => {
          this.router.navigate([{ outlets: { [this.outlet as string]: ['tab', 'mail', 'compose', this.mail.id, 'reply-all'] } }])
        }
      },
      {
        label: 'Transférer',
        icon: 'fa-solid fa-arrow-right',
        command: () => {
          this.router.navigate([{ outlets: { [this.outlet as string]: ['tab', 'mail', 'compose', this.mail.id, 'forward'] } }])
        }
      },
      {
        label: !this.mail.flagged ? 'Ajouter un indicateur' : 'Retirer l\'indicateur',
        icon: !this.mail.flagged ? 'fa-solid fa-flag' : 'fa-regular fa-flag',
        // command: () => this.updateMail(mail, 'flag')
      },
      {
        label: this.mail.unseen ? 'Marquer comme lu' : 'Marquer comme non lu',
        icon: this.mail.unseen ? 'fa-regular fa-envelope' : 'fa-regular fa-envelope-open',
        // command: () => this.updateMail(mail, 'seen')
      },
      {
        label: 'Enregistrer sous',
        icon: 'fa-solid fa-save',
        //command: () => { this.saveasMail(mail) }
      },
      {
        label: 'Imprimer',
        icon: 'fa-solid fa-print',
        disabled: true,
        command: () => { }
      }
    ];
  }
}
