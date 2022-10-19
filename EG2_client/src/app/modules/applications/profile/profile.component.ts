import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    public authentificationService: AuthentificationService
  ) { }

  ngOnInit(): void {
  }

}
