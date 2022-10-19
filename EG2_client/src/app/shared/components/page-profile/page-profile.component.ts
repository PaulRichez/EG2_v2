import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { Country, City } from 'country-state-city';
import { ICountry, ICity } from 'country-state-city'
import { UsersService } from 'src/app/core/services/users.service';
import { ThemesService } from 'src/app/core/services/themes.service';
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
  public countries: ICountry[] = Country.getAllCountries();
  public cities: ICity[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public themesService: ThemesService
  ) { }

  ngOnInit(): void {
    this.setForm()
  }

  public setForm() {
    this.userExtendedGroup = this.formBuilder.group({
      firstName: [{ value: this.user.userExtended.firstName, disabled: false }, [Validators.required]],
      lastName: [{ value: this.user.userExtended.lastName, disabled: false }, [Validators.required]],
      country: [{ value: this.user.userExtended.country, disabled: false }],
      city: [{ value: this.user.userExtended.city, disabled: false }],
      theme: [{ value: this.user.userExtended.theme, disabled: false }],
    });
    this.formUser = this.formBuilder.group({
      userExtended: this.userExtendedGroup,
      userGroup: this.user.user_groups
    })
    if (this.user.userExtended.country) {
      this.setCitiesAvailable(this.user.userExtended.country);
    }
  }

  private setCitiesAvailable(country: ICountry): void {
    if (country) {
      this.cities = City.getCitiesOfCountry(country.isoCode) || [];
    } else {
      this.cities = [];
    }
    if (!this.cities.length) {
      this.userExtendedGroup.get('city')?.setValue(null);
    }
  }

  changeCountry(country: ICountry): void {
    this.setCitiesAvailable(country);
  }

  onSubmit() {
    if (this.formUser.invalid) {
      return;
    }
    this.formUser.disable();
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.formUser.value));
    this.usersService.update(this.user.id, formData).subscribe(
      {
        next: data => {
          this.loading = false;
          this.formUser.enable();
        },
        error: err => {
          this.loading = false;
          this.formUser.enable();
        }
      }
    );
  }

}
