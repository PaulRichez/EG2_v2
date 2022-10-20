import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { ListboxModule } from 'primeng/listbox';
import { ChartModule } from 'primeng/chart';
import {SidebarModule} from 'primeng/sidebar';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { AvatarComponent } from './components/avatar/avatar.component';
import { InlineSVGModule } from 'ng-inline-svg-u';
import { PageProfileComponent } from './components/page-profile/page-profile.component';
const MODULES = [
  ReactiveFormsModule,
  FormsModule,
  CardModule,
  MessageModule,
  CheckboxModule,
  InputTextModule,
  ButtonModule,
  PasswordModule,
  DropdownModule,
  ToolbarModule,
  TabMenuModule,
  AvatarModule,
  MenuModule,
  InlineSVGModule,
  ListboxModule,
  ChartModule,
  SidebarModule,
]

@NgModule({
  declarations: [
    GlobalLoaderComponent,
    NotFoundComponent,
    FileUploadComponent,
    AvatarComponent,
    PageProfileComponent,
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    HttpClientModule,
    MODULES
  ],
  exports: [
    GlobalLoaderComponent,
    NotFoundComponent,
    MODULES,
    FileUploadComponent,
    AvatarComponent,
    PageProfileComponent
  ]
})
export class SharedModule { }
