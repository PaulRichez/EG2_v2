import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requiredNumberType } from '../validators/requireNumberType';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  public isFirstInstall = true;
  public formWebsite!: FormGroup;
  public formEmail!: FormGroup;
  public formFirstUser!: FormGroup;
  public configEmailFromServerValue: boolean = true;
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

  configEmailFromServer(value: boolean) {
    this.configEmailFromServerValue = value;
    if (value = true) {
      this.formEmail = this.formBuilder.group({
        host: ['', []],
        port: ['', []],
        user: ['', []],
        pass: ['', []]
      })
    } else {
      this.formEmail = this.formBuilder.group({
        host: ['', [Validators.required]],
        port: ['', [Validators.required, requiredNumberType()]],
        user: ['', [Validators.required]],
        pass: ['', [Validators.required]]
      })
    }
  }

  private setForm() {
    this.formWebsite = this.formBuilder.group({
      theme: ['light', [Validators.required]],
      society: ['', []],
      logo: [null, [FileUploadValidators.filesLimit(1), FileUploadValidators.accept(['image/*'])]],
    });
    this.configEmailFromServer(true);
    this.formFirstUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

}
