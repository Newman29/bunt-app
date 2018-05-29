import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { TeamCardComponent } from './teams-page/team-card.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamsListService } from '../shared/services/teams-list.service';
import { MatGridListModule, MatIconModule, MatListModule, MatButtonModule, MatExpansionModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BuntCommonModule } from '../shared/common/bunt-common.module';
import { TeamScheduleComponent } from './team-schedule/team-schedule.component';
import { TeamCauseComponent } from './team-cause/team-cause.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';
import { ScheduleModule } from '../schedule/schedule.module';

const MaterialModules = [
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatExpansionModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FlexLayoutModule,
    BuntCommonModule,
    ScheduleModule,
    ...MaterialModules
  ],
  declarations: [
    TeamsPageComponent,
    TeamCardComponent,
    TeamDetailComponent,
    TeamScheduleComponent,
    TeamCauseComponent,
    TeamRosterComponent
  ],
  providers: [
    TeamsListService
  ]
})
export class TeamsModule { }
