import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthentificationService } from '../../authentification/authentification.service';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}