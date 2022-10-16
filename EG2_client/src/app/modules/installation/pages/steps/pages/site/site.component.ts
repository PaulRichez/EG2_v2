import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { InstallationService } from 'src/app/core/services/installation.service';
import { ThemesService } from 'src/app/core/services/themes.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  constructor(
    public installationService: InstallationService,
    public themesService: ThemesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.installationService.formWebsite.invalid) {
      return;
    }
    else {
      this.router.navigate(['/setup/steps/first-user'])
    }
  }

}
