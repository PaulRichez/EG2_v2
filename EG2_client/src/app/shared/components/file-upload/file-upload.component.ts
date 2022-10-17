import { Component, Input, OnInit } from '@angular/core';
import { FileUploadControl } from '@iplab/ngx-file-upload';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() control!: FileUploadControl;
  @Input() title!: string;
  constructor() { }

  ngOnInit(): void {

  }

}
