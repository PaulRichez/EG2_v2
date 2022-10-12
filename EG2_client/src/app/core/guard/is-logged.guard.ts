import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(public router: Router, private authService: AuthentificationService, private tokenStorageService: TokenStorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated() && !this.tokenStorageService.getToken()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    const permissions = route.data['permission'] as Array<string>;
    if (permissions) {
      let havePerm = 0;
      permissions.forEach(permission => {
        if (this.authService.checkpermission(permission)) {
          havePerm++;
        }
      });
      if (havePerm === permissions.length) {
        return true
      }
      this.router.navigate(['auth/access-denied']);
      return false;
    } else {
      return true;
    }
  }

}
