import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { StandingsPageComponent } from './pages/standings-page/standings-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { TeamsPageComponent } from './pages/teams-page/teams-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/standings', pathMatch: 'full' },
  {
    path: 'standings',
    component: StandingsPageComponent,
    data: {
      title: 'Standings'
    }
  },
  {
    path: 'teams',
    component: TeamsPageComponent,
    data: {
      title: 'Teams'
    }
  },
  {
    path: 'schedule',
    component: SchedulePageComponent,
    data: {
      title: 'Schedule'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class BuntRoutingModule { }
