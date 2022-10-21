import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends AppHelperComponent implements OnInit {

  constructor(
    public override route: ActivatedRoute,
    private router: Router
  ) {
    super(route);
  }

  ngOnInit(): void {
  }

}
