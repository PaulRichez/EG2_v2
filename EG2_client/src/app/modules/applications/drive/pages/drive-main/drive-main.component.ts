import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DriveService } from 'src/app/core/services/drive.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import * as qs from 'qs'
import { IFolder } from 'src/app/shared/models/folder.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewFolderComponent } from 'src/app/shared/components/new-folder/new-folder.component';
import { FilesTransfertService } from 'src/app/core/services/files-transfert.service';
import { FilesHelperService } from 'src/app/core/services/files-helper.service';
@Component({
  selector: 'app-drive-main',
  templateUrl: './drive-main.component.html',
  styleUrls: ['./drive-main.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class DriveMainComponent extends AppHelperComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  itemsTop: MenuItem[] = [
    { label: 'Ajouter un dossier', command: () => this.renameOrCreateEntry() }
  ];
  selectedEntry: IFolder | any;
  home!: MenuItem;
  public loadingData = true;
  private subscribeData: any;
  showSelectedEntryInfo = false;

  public idFolder!: string
  folder!: IFolder;
  refNewFolder!: DynamicDialogRef;
  constructor(
    public override route: ActivatedRoute,
    private router: Router,
    private driveService: DriveService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private filesTransfertService: FilesTransfertService,
    private filesHelperService: FilesHelperService,
  ) {
    super(route)
  }
  ngOnDestroy(): void {
    if (this.subscribeData) {
      this.subscribeData.unsubscribe();
    }
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
    if (this.subscribeData) {
      this.subscribeData.unsubscribe();
    }
    this.subscribeData = this.driveService.findOne(this.idFolder, query).subscribe({
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
      this.selectedEntry = null;
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
  renameOrCreateEntry(entry?: IFolder | any) {
    this.refNewFolder = this.dialogService.open(NewFolderComponent, {
      header: entry ? `Renommer le ${!entry.url ? 'dossier' : 'fichier'}` : 'Nouveau dossier',
      baseZIndex: 10000,
      data: {
        name: entry ? entry.name : ''
      }
    });
    this.refNewFolder.onClose.subscribe(result => {
      if (result) {
        let sub = this.driveService.createFolder(result, this.idFolder)
        if (entry) {
          sub = this.driveService.renameFolder(result, entry.id)
        }
        sub.subscribe({
          next: value => {
            if (!this.folder.children) {
              this.folder.children = [];
            }
            if (!entry) {
              (this.folder.children as IFolder[]).push(value)
            } else {
              (this.folder.children as IFolder[]).filter(f => f.id == value.id).map(f => f.name = value.name)
            }
            this.folder = Object.assign({}, this.folder);
          },
        })
      }
    });
  }

  showInfoEntry(entry: IFolder | any) {
    if (entry) {
      this.showSelectedEntryInfo = true;
      this.selectedEntry = entry;
    } else {
      this.closeInfos();
    }
  }

  closeInfos() {
    this.showSelectedEntryInfo = false;
    this.selectedEntry = null;
  }

  upload(event, fileInput) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('files.file', file, file.name);
    this.filesTransfertService.addToQueue('upload', file, this.driveService.createFiles(formData, this.idFolder));
  }
}
