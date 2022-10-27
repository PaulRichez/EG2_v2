import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriveService } from 'src/app/core/services/drive.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

import { IFolder } from 'src/app/shared/models/folder.model';
import { FilesHelperService } from 'src/app/core/services/files-helper.service';
@Component({
  selector: 'app-file-table-view',
  templateUrl: './file-table-view.component.html',
  styleUrls: ['./file-table-view.component.scss']
})
export class FileTableViewComponent extends AppHelperComponent implements OnInit, OnChanges {
  @Input() selectedFolderId!: string;
  @Input() loadingData = true;
  @Input() folder!: IFolder;
  @Output() dbClick = new EventEmitter<any>();
  directoryData!: IFolder[] | any[];
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
    if (changes['folder']) {
      this.directoryData = [];
      if (this.folder?.children) {
        (this.folder.children as IFolder[]).forEach(f => this.directoryData.push(f))
      }
      if (this.folder?.files) {
        (this.folder.files as any[]).forEach(f => this.directoryData.push(f))
      }
    }
  }


}
