import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DriveService } from 'src/app/core/services/drive.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import * as qs from 'qs'
import { IFolder } from 'src/app/shared/models/folder.model';
@Component({
  selector: 'app-drive-main',
  templateUrl: './drive-main.component.html',
  styleUrls: ['./drive-main.component.scss']
})
export class DriveMainComponent extends AppHelperComponent implements OnInit {
  items!: MenuItem[];

  home!: MenuItem;
  public loadingData = true;

  public idFolder!: string
  folder!: IFolder;
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
    } else {
      this.fetchData()
    }
  }

  fetchData() {
    const query = qs.stringify({
      populate: ['deep'],
    }, {
      encodeValuesOnly: true,
    });
    this.loadingData = true;
    this.driveService.findOne(this.idFolder, query).subscribe({
      next: result => {
        this.folder = result;
        this.loadingData = false;
      },
      error: err => {
        this.loadingData = false;
        console.error(err);
      },
    })
  }

  goToFolder(id: string) {
    this.idFolder = id;
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'drive', id] } }])
  }

  dbClick(entry: IFolder | any) {
    if (!entry.url) {
      this.goToFolder(entry.id);
      this.fetchData();
    }
  }

}
