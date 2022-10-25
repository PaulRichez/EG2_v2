import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-drive-main',
  templateUrl: './drive-main.component.html',
  styleUrls: ['./drive-main.component.scss']
})
export class DriveMainComponent extends AppHelperComponent implements OnInit {
  items!: MenuItem[];

  home!: MenuItem;

  constructor(
    public override route: ActivatedRoute,
    private router: Router,
  ) { 
    super(route)
  }

  ngOnInit(): void {
  }

}
