import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScheduleService } from '../shared/services/schedule.service';
import { ScheduledGameCardComponent } from './schedule-game-card/scheduled-game-card.component';

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
  ],
  exports: [
    ScheduledGameCardComponent
  ]
})
export class ScheduleModule { }
