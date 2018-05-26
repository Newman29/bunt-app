import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { TeamCardComponent } from './teams-page/team-card.component';
import { TeamDetailComponent } from './teams-page/team-detail/team-detail.component';
import { TeamsListService } from '../shared/services/teams-list.service';
import { MatGridListModule, MatIconModule, MatListModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BuntCommonModule } from '../shared/common/bunt-common.module';

const MaterialModules = [
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatButtonModule
];

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FlexLayoutModule,
    BuntCommonModule,
    ...MaterialModules
  ],
  declarations: [
    TeamsPageComponent,
    TeamCardComponent,
    TeamDetailComponent
  ],
  providers: [
    TeamsListService
  ]
})
export class TeamsModule { }
