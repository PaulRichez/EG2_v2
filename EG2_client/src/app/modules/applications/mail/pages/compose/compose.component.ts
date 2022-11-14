import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHelperComponent } from 'src/app/shared/extends/app-helper/app-helper.component';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent extends AppHelperComponent implements OnInit {

  constructor(
    private router: Router,
    public override route: ActivatedRoute,
  ) {
    super(route)
  }

  ngOnInit(): void {
    const messageId = this.route.snapshot.params['id'];
    const action = this.route.snapshot.params['action'];
    if (messageId) {
      console.log(messageId, action);
    } else {

    }
  }

}
