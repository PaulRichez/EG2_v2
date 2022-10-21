import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent extends AppHelperComponent implements OnInit {

  constructor(
    public override route: ActivatedRoute,
    private router: Router
  ) {
    super(route);
  }
  ngOnInit(): void {
  }

}
