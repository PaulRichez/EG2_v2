import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  public isFirstInstall = true;
  constructor(
    private http: HttpClient
  ) { }

  public checkFirstInstall() {
    if (!this.isFirstInstall) {
      return of(false);
    } else {
      return this.http.get<any>(`${environment.apiUrl}/api/first-install/check`).pipe(map(result => {
        this.isFirstInstall = result;
        return result;
      }));
    }
  }
}
