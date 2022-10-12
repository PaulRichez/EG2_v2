import { Component } from '@angular/core';
import { ThemesService } from './core/services/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private themesService: ThemesService) {
    this.themesService.current = 'dark';
  }
}
