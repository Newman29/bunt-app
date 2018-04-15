import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingsPageComponent } from './standings-page/standings-page.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { BuntMaterialModule } from '../shared/modules/bunt-material.module';
import { RostersPageComponent } from './rosters-page/rosters-page.component';
import { StandingsService } from '../shared/services/standings.service';
import { HttpClient } from '@angular/common/http';
import { StandingsTableComponent } from './standings-page/standings-table.component';
import { PctPipe } from './standings-page/pct.pipe';
import { DiffPipe } from './standings-page/diff.pipe';

@NgModule({
  imports: [
    CommonModule,
    BuntMaterialModule
  ],
  declarations: [
    SchedulePageComponent,
    StandingsPageComponent,
    StandingsTableComponent,
    RostersPageComponent,
    PctPipe,
    DiffPipe
  ],
  providers: [
    StandingsService
  ]
})
export class PagesModule { }
