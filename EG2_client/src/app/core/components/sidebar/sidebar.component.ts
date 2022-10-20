import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public applicationsService: ApplicationsService
  ) { }

  ngOnInit(): void {
  }

}
