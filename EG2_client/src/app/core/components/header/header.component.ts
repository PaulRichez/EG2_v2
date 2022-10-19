import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from '../../authentification/authentification.service';
import { ApplicationsService } from '../../services/applications.service';
import { DefaultConfigService } from '../../services/default-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  apiUrl = environment.apiUrl;
  public items: MenuItem[] = [
    {
      label: 'Mon profil',
      icon: 'pi pi-user',
      routerLink: ['/profile']
    },
    {
      label: 'Se déconnecter',
      icon: 'pi pi-sign-out',
      routerLink: ['auth/logout']
    }
  ];
  constructor(
    public applicationsService: ApplicationsService,
    public authentificationService: AuthentificationService,
    public defaultConfigService: DefaultConfigService
  ) { }

  ngOnInit(): void {
  }

}