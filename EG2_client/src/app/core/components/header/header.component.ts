import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      command: () => { this.applicationsService.openNewApplication('profile'); }
    },
    {
      label: 'Se déconnecter',
      icon: 'pi pi-sign-out',
      command: () => { this.authentificationService.logout() }
    }
  ];
  constructor(
    public applicationsService: ApplicationsService,
    public authentificationService: AuthentificationService,
    public defaultConfigService: DefaultConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}