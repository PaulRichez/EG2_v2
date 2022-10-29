import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFileQueue } from 'src/app/shared/models/files-queue.model';

@Injectable({
  providedIn: 'root'
})
export class FilesTransfertService {
  public uploadDriveSubject = new BehaviorSubject<any>(undefined);
  queue: IFileQueue[] = [];

  constructor() { }

  addToQueue(type: 'download' | 'upload', fileOrData: any, request: Observable<any>) {
    let queue: IFileQueue = {
      type,
      progress: 0,
      request
    }
    if (type === 'download') {
      queue.file = fileOrData;
      queue.request.subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.DownloadProgress) {
            queue.progress = Math.round(100 * event.loaded / event.total);
          }
          if (event.type === HttpEventType.Response) {
            const url = window.URL.createObjectURL(event.body);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileOrData.name;
            link.click();
            window.URL.revokeObjectURL(url);
          }
        },
        error: (err: any) => {
          queue.error = err;
        }
      });
    } else {
      queue.data = fileOrData;
      queue.request.subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            queue.progress = Math.round(100 * event.loaded / event.total);
          }
          if (event.type === HttpEventType.Response) {
            this.uploadDriveSubject.next(event.body);
          }
        },
        error: (err: any) => {
          queue.error = err;
        }
      });
    }
    this.queue.push(queue);
  }

  isTransfertInProgress() {
    return this.queue.filter((q) => q.progress !== 100 && !q.error).length > 0;
  }
}
