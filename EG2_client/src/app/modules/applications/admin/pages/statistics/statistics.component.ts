import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupesService } from 'src/app/core/services/groupes.service';
import { UsersService } from 'src/app/core/services/users.service';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends AppHelperComponent implements OnInit {
  statsCard: {
    icon: string;
    text: string;
    obs: Observable<number>;
  }[] = [
      {
        icon: 'fa-solid fa-users',
        text: 'Utilisateurs',
        obs: this.usersService.count()
      },
      {
        icon: 'fa-solid fa-user-group',
        text: 'Groupes',
        obs: this.groupesService.count()
      }
    ];
  constructor(
    private usersService: UsersService,
    private groupesService: GroupesService,
    public override route: ActivatedRoute,
  ) {
    super(route);
  }

  ngOnInit(): void {
  }

}
