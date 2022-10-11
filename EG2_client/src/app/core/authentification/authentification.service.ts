import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.model';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { ThemesService } from '../services/themes.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public connectedUser!: IUser;
  public connectionStatus = new BehaviorSubject<boolean>(false);
  observableconnectedUser = new BehaviorSubject<IUser | null>(this.connectedUser);
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private themesService: ThemesService) { }
    login(username: string, password: string): Observable<any> {
      this.connectionStatus.next(true);
      return this.http.post<any>(`${environment.apiUrl}/api/auth/local`, {
        identifier: username,
        password
      }).pipe(map(data => {
        this.themesService.current = data.user.theme;
        return data;
      }));;
    }
  
    loginWithToken() {
      return this.http.get<any>(`${environment.apiUrl}/api/users/me`)
        .pipe(
          map(data => {
            this.connectedUser = data;
            this.observableconnectedUser.next(this.connectedUser);
            this.themesService.current = this.connectedUser.theme;
            this.connectionStatus.next(false);
            return data;
          }),
          catchError(err => {
            this.logout();
            return throwError(err);
          }),
        );
    }
  
    logout() {
      this.connectedUser = null as unknown as IUser;
      console.log(this.connectedUser)
      this.themesService.current = 'light';
      this.tokenStorageService.clearStorage();
      this.observableconnectedUser.next(this.connectedUser);
      this.router.navigate(['/auth/login']);
    }
  
    isAuthenticated(): boolean {
      return !!this.connectedUser;
    }
  
    checkpermission(perm: string) {
      const permissionsFromGroups = this.connectedUser.user_groups.map(group => group.permissions.map(p => p.name));
      if (permissionsFromGroups.some(p => p.includes(perm))) {
        return true;
      }
      return this.connectedUser.permissions.some(p => p.name === perm);
    }
  
    adminAccess(): boolean {
      const permissionsFromGroups = this.connectedUser.user_groups.map(group => group.permissions.map(p => p.name));
      if (permissionsFromGroups.some(p => p.find(perm => perm.startsWith('admin-')))) {
        return true;
      }
      return this.connectedUser.permissions.some(p => p.name.startsWith('admin-'));
    }
}
