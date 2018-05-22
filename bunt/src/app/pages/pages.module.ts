import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { StandingsPageComponent } from './standings-page/standings-page.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { BuntMaterialModule } from '../shared/modules/bunt-material.module';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { StandingsService } from '../shared/services/standings.service';
import { HttpClient } from '@angular/common/http';
import { StandingsTableComponent } from './standings-page/standings-table.component';
import { PctPipe } from './standings-page/pct.pipe';
import { DiffPipe } from './standings-page/diff.pipe';
import { ScheduleService } from '../shared/services/schedule.service';
import { ScheduledGameCardComponent } from './schedule-page/scheduled-game-card.component';
import { TeamsListService } from '../shared/services/teams-list.service';
import { TeamCardComponent } from './teams-page/team-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { TeamDetailComponent } from './teams-page/team-detail/team-detail.component';

@NgModule({
  imports: [
    CommonModule,
    BuntMaterialModule,
    FlexLayoutModule,
    PdfViewerModule
  ],
  declarations: [
    SchedulePageComponent,
    ScheduledGameCardComponent,
    StandingsPageComponent,
    StandingsTableComponent,
    TeamsPageComponent,
    TeamCardComponent,
    PctPipe,
    DiffPipe,
    RulesPageComponent,
    TeamDetailComponent
  ],
  providers: [
    StandingsService,
    ScheduleService,
    TeamsListService
  ]
})
export class PagesModule { }
