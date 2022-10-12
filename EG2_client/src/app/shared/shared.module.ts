import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
const MODULES = [
  ReactiveFormsModule,
  FormsModule,
  CardModule,
  MessageModule,
  CheckboxModule,
  InputTextModule,
  ButtonModule,
  PasswordModule
]

@NgModule({
  declarations: [
    GlobalLoaderComponent
  ],
  imports: [
    CommonModule,
    MODULES
  ],
  exports: [
    GlobalLoaderComponent,
    MODULES
  ]
})
export class SharedModule { }
