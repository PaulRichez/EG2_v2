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
  items: MenuItem[] = [];

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
    this.getRoot()
    this.idFolder = this.route.snapshot.params['idFolder'];
    if (this.idFolder) {
      this.goToFolder(this.idFolder)
    }
  }

  getRoot() {
    this.driveService.getmyDriveRoot('').subscribe({
      next: result => {
        this.home = { id: result.id, icon: 'fa fa-home', routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'drive', result.id] } }], command: () => this.goToFolder(result.id) }
        this.goToFolder(result.id)
      },
      error(err) {
        console.error(err)
      },
    })
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
        this.createBreadcrumb();
      },
      error: err => {
        this.loadingData = false;
        console.error(err);
      },
    })
  }

  createBreadcrumb() {
    this.items = []
    if (this.folder.parent?.parent && this.folder.parent.parent.id !== this.home.id) {
      this.items.push(
        {
          id: this.folder.parent.parent?.id,
          label: '...',
          routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'drive', this.folder.parent.parent?.id] } }],
          command: () => this.goToFolder(this.folder.parent?.parent?.id as string)
        }
      )
    }
    if (this.folder.parent && this.folder.parent.id !== this.home.id) {
      this.items.push(
        {
          id: this.folder.parent.id,
          label: this.folder.parent.name,
          routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'drive', this.folder.parent.id] } }],
          command: () => this.goToFolder(this.folder?.parent?.id as string)
        }
      )
    }
    if (this.folder && this.folder.id !== this.home.id) {
      this.items.push({ id: this.folder.id, label: this.folder.name, routerLink: ['', { outlets: { [this.appOutlet as string]: ['tab', 'drive', this.folder.id] } }], command: () => this.goToFolder(this.folder.id) }
      )
    }
  }

  goToFolder(id: string) {
    this.idFolder = id;
    this.router.navigate([{ outlets: { ['primary']: '', [this.outlet as string]: ['tab', 'drive', id] } }]).then(() => {
      if (this.home) {
        this.fetchData();
      }
    })
  }

  dbClick(entry: IFolder | any) {
    if (!entry.url) {
      this.goToFolder(entry.id);
    }
  }

}
