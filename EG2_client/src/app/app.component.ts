import { Component } from '@angular/core';
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
          setTimeout(() => {
            this.router.navigate([{ outlets: { "app-admin": ['admin'] } }]).then(() => {
              this.router.navigate([{ outlets: { "app-dashboard": ['dashboard'] } }]);
            });
          }, 100)
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
