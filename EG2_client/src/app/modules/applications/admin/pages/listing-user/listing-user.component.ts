import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import * as qs from 'qs'
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/shared/models/user.model';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-listing-user',
  templateUrl: './listing-user.component.html',
  styleUrls: ['./listing-user.component.scss']
})
export class ListingUserComponent extends AppHelperComponent implements OnInit {
  public loadingData = true;
  public users: IUser[] = [];
  totalRecords = 0;
  constructor(
    private usersService: UsersService,
    public override route: ActivatedRoute,
  ) {
    super(route)
  }

  ngOnInit(): void {

  }

  fetchUsers(event: LazyLoadEvent) {
    const sort = event.sortField ? [`${event.sortField}:${event.sortOrder === 1 ? 'asc' : 'desc'}`] : {};
    console.log(event)
    const query = qs.stringify({
      offset: event.first,
      limit: event.rows,
      populate: ['deep'],
      sort
    }, {
      encodeValuesOnly: true,
    });
    this.loadingData = true;
    this.usersService.find(query).subscribe({
      next: result => {
        this.users = result.data;
        this.totalRecords = result.meta.count;
        this.loadingData = false;
        console.log(this.loadingData)
      },
      error: err => {
        this.loadingData = false;
      }

    });
  }

}
