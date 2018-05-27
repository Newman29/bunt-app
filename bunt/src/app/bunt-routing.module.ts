import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'rules',
    loadChildren: './rules/rules.module#RulesModule',
    data: {
      title: 'Rules'
    }
  },
  {
    path: 'teams',
    loadChildren: './teams/teams.module#TeamsModule',
    data: {
      title: 'Teams'
    }
  },
  {
    path: 'standings',
    loadChildren: './standings/standings.module#StandingsModule',
    data: {
      title: 'Standings'
    }
  },
  {
    path: 'schedule',
    loadChildren: './schedule/schedule.module#ScheduleModule',
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
