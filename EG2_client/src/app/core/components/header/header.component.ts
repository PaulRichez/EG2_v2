import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public applicationsService: ApplicationsService
  ) { }

  ngOnInit(): void {
  }

}