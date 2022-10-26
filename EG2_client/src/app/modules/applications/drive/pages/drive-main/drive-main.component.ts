import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DriveService } from 'src/app/core/services/drive.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-drive-main',
  templateUrl: './drive-main.component.html',
  styleUrls: ['./drive-main.component.scss']
})
export class DriveMainComponent extends AppHelperComponent implements OnInit {
  items!: MenuItem[];

  home!: MenuItem;

  public idFolder!: string
  constructor(
    public override route: ActivatedRoute,
    private router: Router,
    private driveService: DriveService
  ) {
    super(route)
  }

  ngOnInit(): void {
    this.idFolder = this.route.snapshot.params['idFolder'];
    if (!this.idFolder) {
      this.driveService.getmyDriveRoot('').subscribe({
        next: result => {
          this.goToFolder(result.id)
        },
        error(err) {
          console.error(err)
        },
      })
    }
  }

  goToFolder(id: string) {
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'drive', id] } }])
  }

}
