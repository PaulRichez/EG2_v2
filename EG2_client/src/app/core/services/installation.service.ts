import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requiredFileType } from '../validators/requiredFileType';
import { requiredNumberType } from '../validators/requireNumberType';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  public isFirstInstall = true;
  public formWebsite!: FormGroup;
  public formEmail!: FormGroup;
  public formFirstUser!: FormGroup;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
    this.setForm();
  }

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

  private setForm() {
    this.formWebsite = this.formBuilder.group({
      theme: ['', [Validators.required]],
      society: ['', []],
      logo: ['', [requiredFileType('png')]],
    });
    this.formEmail = this.formBuilder.group({
      host: ['', [Validators.required]],
      port: ['', [Validators.required, requiredNumberType()]],
    })
    this.formFirstUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

}
