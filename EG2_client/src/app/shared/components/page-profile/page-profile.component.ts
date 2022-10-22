import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { Country, City } from 'country-state-city';
import { ICountry, ICity } from 'country-state-city'
import { UsersService } from 'src/app/core/services/users.service';
import { ThemesService } from 'src/app/core/services/themes.service';
import { GroupesService } from 'src/app/core/services/groupes.service';
import { IUserGroup } from '../../models/user-group.model';
@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit, OnChanges {
  @Input() user!: IUser;
  @Input() loadingData!: boolean;
  @Input() type!: string;
  loadingSave = false;
  loadingDataGroup = true;
  groups: IUserGroup[] = [];
  public formUser!: FormGroup;
  public userExtendedGroup!: FormGroup;
  public countries: ICountry[] = Country.getAllCountries();
  public cities: ICity[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public themesService: ThemesService,
    private groupesService: GroupesService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loadingData'].currentValue == false) {
      setTimeout(() => this.setForm(), 100);
    }
  }

  ngOnInit(): void {
    this.setForm()
    if (this.type !== 'profile') {
      this.fetchGroups();
    }
  }

  public setForm() {
    this.userExtendedGroup = this.formBuilder.group({
      firstName: [{ value: this.user?.userExtended?.firstName, disabled: false }, [Validators.required]],
      lastName: [{ value: this.user?.userExtended?.lastName, disabled: false }, [Validators.required]],
      country: [{ value: this.user?.userExtended?.country, disabled: false }],
      city: [{ value: this.user?.userExtended?.city, disabled: false }],
      theme: [{ value: this.user?.userExtended?.theme, disabled: false }],
    });
    this.formUser = this.formBuilder.group({
      userExtended: this.userExtendedGroup,
      userGroup: [{ value: this.user?.user_groups, disabled: false }],
    })
    if (this.user?.userExtended?.country) {
      this.setCitiesAvailable(this.user.userExtended.country);
    }
    if (this.loadingData) {
      this.formUser.disable();
    } else {
      setTimeout(() => this.formUser.enable(), 0);

    }
  }

  private fetchGroups() {
    this.groupesService.find('').subscribe(
      {
        next: result => {
          this.groups = result.data;
          this.loadingSave = false;
        },
        error: err => {
          this.loadingSave = false;
        }
      }
    );
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
    let action = this.usersService.create(formData)
    if (this.type != 'add') {
      action = this.usersService.update(this.user.id, formData);
    }
    action.subscribe(
      {
        next: data => {
          this.loadingSave = false;
          this.formUser.enable();
        },
        error: err => {
          this.loadingSave = false;
          this.formUser.enable();
        }
      }
    );
  }

}
