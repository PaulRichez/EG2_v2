import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthentificationService } from '../../authentification/authentification.service';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.redrawTabsWidth()
  }
  @ViewChild('avatarDiv') avatarDiv!: ElementRef;
  @ViewChild('parentDiv') parentDiv!: ElementRef;
  public activeIndex!: number;
  public items: MenuItem[] = [
    {
      label: 'Mon profil',
      icon: 'pi pi-user',
      command: () => { this.applicationsService.openNewApplication('profile'); }
    },
    {
      label: 'Se déconnecter',
      icon: 'pi pi-sign-out',
      command: () => { this.authentificationService.logout() }
    }
  ];
  private sub!: any;
  constructor(
    public applicationsService: ApplicationsService,
    public authentificationService: AuthentificationService,
    private router: Router,
  ) { }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.redrawTabsWidth()
  }

  redrawTabsWidth() {
    document.documentElement.style.setProperty(`--headerTabsWidth`, this.parentDiv.nativeElement.offsetWidth - this.avatarDiv.nativeElement.offsetWidth + 'px');
  }

  ngOnInit(): void {
    this.sub = this.applicationsService.applicaitonChangeSubject.subscribe((tab) => {
      setTimeout(() => {
        this.activeIndex = tab?.index || 0;
      }, 1)
    })
  }

  handleChange(event: any) {
    this.applicationsService.selectApp(this.applicationsService.applicationsTab[event.index])
  }
  handleClose(event: any) {

  }

}