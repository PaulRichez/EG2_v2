import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { UsersService } from 'src/app/core/services/users.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';
import * as qs from 'qs'
import { GroupesService } from 'src/app/core/services/groupes.service';
import { IUserGroup } from 'src/app/shared/models/user-group.model';

@Component({
  selector: 'app-listing-group',
  templateUrl: './listing-group.component.html',
  styleUrls: ['./listing-group.component.scss']
})
export class ListingGroupComponent extends AppHelperComponent implements OnInit {

  public loadingData = true;
  public groups: IUserGroup[] = [];
  totalRecords = 0;
  constructor(
    private groupesService: GroupesService,
    public override route: ActivatedRoute,
  ) {
    super(route)
  }

  ngOnInit(): void {
  }

  fetchGroups(event: LazyLoadEvent) {
    const sort = event.sortField ? [`${event.sortField}:${event.sortOrder === 1 ? 'asc' : 'desc'}`] : {};
    console.log(event)
    const query = qs.stringify({
      pagination: {
        page: (event.first || 0) / (event.rows || 5) + 1,
        pageSize: event.rows,
      },
      sort,
      populate: ['deep'],
    }, {
      encodeValuesOnly: true,
    });
    this.loadingData = true;
    this.groupesService.find(query).subscribe({
      next: result => {
        this.groups = result.data;
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
