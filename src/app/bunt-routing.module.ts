import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { StandingsPageComponent } from './pages/standings-page/standings-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { RostersPageComponent } from './pages/rosters-page/rosters-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/standings', pathMatch: 'full' },
  { path: 'standings', component: StandingsPageComponent },
  { path: 'rosters', component: RostersPageComponent },
  { path: 'schedule', component: SchedulePageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class BuntRoutingModule { }
