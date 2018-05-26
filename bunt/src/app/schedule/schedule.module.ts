import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { SchedulePageComponent } from '../schedule/schedule-page/schedule-page.component';
import { ScheduledGameCardComponent } from '../schedule/schedule-page/scheduled-game-card.component';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScheduleService } from '../shared/services/schedule.service';

const MaterialModules = [
  MatToolbarModule,
  MatButtonModule
];

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FlexLayoutModule,
    ...MaterialModules
  ],
  declarations: [
    SchedulePageComponent,
    ScheduledGameCardComponent
  ],
  providers: [
    ScheduleService
  ]
})
export class ScheduleModule { }
