import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingsPageComponent } from './standings-page/standings-page.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { BuntMaterialModule } from '../shared/modules/bunt-material.module';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { StandingsService } from '../shared/services/standings.service';
import { HttpClient } from '@angular/common/http';
import { StandingsTableComponent } from './standings-page/standings-table.component';
import { PctPipe } from './standings-page/pct.pipe';
import { ScheduleService } from '../shared/services/schedule.service';
import { ScheduledGameCardComponent } from './schedule-page/scheduled-game-card.component';
import { TeamsListService } from '../shared/services/teams-list.service';
import { TeamCardComponent } from './teams-page/team-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeamDetailComponent } from './teams-page/team-detail/team-detail.component';
import { FancyTitleComponent } from '../shared/components/fancy-title/fancy-title.component';
import { RouterModule } from '@angular/router';
import { CountdownComponent } from '../shared/components/countdown/countdown.component';

@NgModule({
  imports: [
    CommonModule,
    BuntMaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [
    SchedulePageComponent,
    ScheduledGameCardComponent,
    StandingsPageComponent,
    StandingsTableComponent,
    TeamsPageComponent,
    TeamCardComponent,
    PctPipe,
    TeamDetailComponent,
    FancyTitleComponent,
    CountdownComponent
  ],
  providers: [
    StandingsService,
    ScheduleService,
    TeamsListService
  ]
})
export class PagesModule { }
