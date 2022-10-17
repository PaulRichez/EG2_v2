import { Component, OnInit } from '@angular/core';
import { InstallationService } from 'src/app/core/services/installation.service';

@Component({
  selector: 'app-first-user',
  templateUrl: './first-user.component.html',
  styleUrls: ['./first-user.component.scss']
})
export class FirstUserComponent implements OnInit {
  public loading = false;
  constructor(
    public installationService: InstallationService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.installationService.formFirstUser.invalid) {
      return;
    }
    else {
      this.loading = true;
      this.installationService.formWebsite.disable();
      this.installationService.formFirstUser.disable();

      let logo = null;
      if (this.installationService.formWebsite.get('logo')?.value) {
        logo = this.installationService.formWebsite.get('logo')?.value[0]
      }
      const formData = new FormData();
      if (logo) {
        formData.append('files.logo', logo, logo.name);
      }
      formData.append('data', JSON.stringify({ site: this.installationService.formWebsite.value, firstUser: this.installationService.formFirstUser.value }));

      this.installationService.setupFirstInstall(formData).subscribe(
        res => {
          this.loading = false;
        },
        err => {
          this.loading = false;
        },
      );
    }
  }


}
