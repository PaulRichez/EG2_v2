import { Component, OnInit } from '@angular/core';
import { InstallationService } from 'src/app/core/services/installation.service';

@Component({
  selector: 'app-first-user',
  templateUrl: './first-user.component.html',
  styleUrls: ['./first-user.component.scss']
})
export class FirstUserComponent implements OnInit {

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

    }
  }


}
