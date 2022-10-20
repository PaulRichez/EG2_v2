import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './core/authentification/authentification.service';
import { ApplicationsService } from './core/services/applications.service';
import { DefaultConfigService } from './core/services/default-config.service';
import { ThemesService } from './core/services/themes.service';
import { TokenStorageService } from './core/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768
    if (this.isMobile) {
      this.displaySidebar = false;
    }
  }
  displaySidebar = true;
  public isMobile = window.innerWidth < 768;
  loading = true;
  constructor(
    private themesService: ThemesService,
    public authService: AuthentificationService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    public applicationsService: ApplicationsService,
    public defaultConfigService: DefaultConfigService,
  ) {
    this.themesService.current = 'light';
    if (this.tokenStorageService.getToken()) {
      this.authService.loginWithToken().subscribe({
        next: data => {
          this.defaultConfigService.get().subscribe();
          this.loading = false;
        },
        error: err => {
          this.loading = false;
        }
      }
      );
    } else {
      this.loading = false;
    }
  }
}
