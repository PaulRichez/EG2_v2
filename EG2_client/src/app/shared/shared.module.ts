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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
const MODULES = [
  ReactiveFormsModule,
  FormsModule,
  CardModule,
  MessageModule,
  CheckboxModule,
  InputTextModule,
  ButtonModule,
  PasswordModule,
  HttpClientModule
]

@NgModule({
  declarations: [
    GlobalLoaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MODULES
  ],
  exports: [
    GlobalLoaderComponent,
    NotFoundComponent,
    MODULES
  ]
})
export class SharedModule { }
