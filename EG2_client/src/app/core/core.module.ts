import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor/http-interceptor.interceptor';
import { FormValidationDirective } from './directives/form-validation.directive';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NamedOutletDirective } from './directives/named-outlet.directive';


@NgModule({
  declarations: [
    FormValidationDirective,
    HeaderComponent,
    NamedOutletDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FormValidationDirective,
    SharedModule,
    HeaderComponent,
    NamedOutletDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
})
export class CoreModule { }
