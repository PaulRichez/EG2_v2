import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor/http-interceptor.interceptor';
import { FormValidationDirective } from './directives/form-validation.directive';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FormValidationDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FormValidationDirective,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
})
export class CoreModule { }
