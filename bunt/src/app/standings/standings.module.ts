import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingsRoutingModule } from './standings-routing.module';
import { MatTableModule, MatCardModule, MatSortModule } from '@angular/material';
import { StandingsPageComponent } from './standings-page/standings-page.component';
import { BuntCommonModule } from '../shared/common/bunt-common.module';
import { StandingsTableComponent } from './standings-page/standings-table.component';

const MaterialModules = [
  MatTableModule,
  MatSortModule,
  MatCardModule,
];

@NgModule({
  imports: [
    CommonModule,
    StandingsRoutingModule,
    BuntCommonModule,
    ...MaterialModules
  ],
  declarations: [
    StandingsPageComponent,
    StandingsTableComponent
  ]
})
export class StandingsModule { }
