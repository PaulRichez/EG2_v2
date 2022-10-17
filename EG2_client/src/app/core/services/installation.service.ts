import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  public isFirstInstall = true;
  public formWebsite!: FormGroup;
  public formFirstUser!: FormGroup;
  public fileUploadControl = new FormControl(null, [FileUploadValidators.filesLimit(1), FileUploadValidators.accept(['image/*'])]);
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
      theme: ['light', [Validators.required]],
      society: ['', []],
      logo: this.fileUploadControl,
    });
    this.formFirstUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

}
