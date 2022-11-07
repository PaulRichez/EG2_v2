import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(
    public authentificationService: AuthentificationService
  ) { }

  ngOnInit(): void {
  }

}
