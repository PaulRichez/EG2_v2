import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
  @Input() user!: IUser;
  loading = false;
  public formUser!: FormGroup;
  public userExtendedGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setForm()
  }

  public setForm() {
    this.userExtendedGroup = this.formBuilder.group({
      firstName: [{ value: this.user.userExtended.firstName, disabled: false }, [Validators.required]],
      lastName: [{ value: this.user.userExtended.lastName, disabled: false }, [Validators.required]],
    });
    this.formUser = this.formBuilder.group({
      userExtended: this.userExtendedGroup,
      email: [{ value: this.user.email, disabled: true }]
    })
  }

  onSubmit() { }

}
