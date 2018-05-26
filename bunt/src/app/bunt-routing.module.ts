import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { StandingsPageComponent } from './pages/standings-page/standings-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { TeamsPageComponent } from './pages/teams-page/teams-page.component';
import { RulesPageComponent } from './rules/rules-page/rules-page.component';

const routes: Routes = [
  {
    path: 'rules',
    loadChildren: './rules/rules.module#RulesModule',
    data: {
      title: 'Rules'
    }
  },
  {
    path: 'standings',
    component: StandingsPageComponent,
    data: {
      title: 'Standings'
    }
  },
  {
    path: 'schedule',
    component: SchedulePageComponent,
    data: {
      title: 'Schedule'
    }
  },
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class BuntRoutingModule { }
