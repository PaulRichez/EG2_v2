import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CalendarMainComponent } from './components/calendar-main/calendar-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewEventComponent } from './components/new-event/new-event.component';
import { NewSourceComponent } from './components/new-source/new-source.component';


@NgModule({
  declarations: [
    CalendarComponent,
    CalendarMainComponent,
    NewEventComponent,
    NewSourceComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule
  ]
})
export class CalendarModule { }
