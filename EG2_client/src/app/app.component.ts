import { Component } from '@angular/core';
import { AuthentificationService } from './core/authentification/authentification.service';
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
    private authService: AuthentificationService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.themesService.current = 'light';
    if (this.tokenStorageService.getToken()) {
      this.authService.loginWithToken().subscribe(() => this.loading = false);
    } else {
      this.loading = false;
    }
  }
}
