import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriveService } from 'src/app/core/services/drive.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import * as qs from 'qs'
import { IFolder } from 'src/app/shared/models/folder.model';
import { FilesHelperService } from 'src/app/core/services/files-helper.service';
@Component({
  selector: 'app-file-table-view',
  templateUrl: './file-table-view.component.html',
  styleUrls: ['./file-table-view.component.scss']
})
export class FileTableViewComponent extends AppHelperComponent implements OnInit, OnChanges {
  @Input() selectedFolderId!: string;
  loadingData = true;
  folder!: IFolder;
  directoryData!: any[];
  tableSelectedEntry: any;
  constructor(
    public override route: ActivatedRoute,
    private router: Router,
    private driveService: DriveService,
    public filesHelper: FilesHelperService
  ) {
    super(route)
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const query = qs.stringify({
      populate: ['deep'],
    }, {
      encodeValuesOnly: true,
    });
    this.loadingData = true;
    this.driveService.findOne(this.selectedFolderId, query).subscribe({
      next: result => {
        this.folder = result;
        this.directoryData = [];
        if (this.folder.children) {
          (this.folder.children as IFolder[]).forEach(f => this.directoryData.push(f))
        }
        if (this.folder.files) {
          (this.folder.files as any[]).forEach(f => this.directoryData.push(f))
        }
        console.log(result)
        this.loadingData = false;
      },
      error: err => {
        this.loadingData = false;
        console.error(err);
      },
    })
  }

}
