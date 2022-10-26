import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(
    private http: HttpClient,
  ) { }

  public findOne(id: string | number, query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/folder/${id}?${query}`);
  }
  public getmyDriveRoot(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/folder/drive/my-drive?${query}`);
  }
}
