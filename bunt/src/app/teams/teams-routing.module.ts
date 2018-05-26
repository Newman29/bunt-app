import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { TeamDetailComponent } from './teams-page/team-detail/team-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsPageComponent
  },
  {
    path: ':id',
    component: TeamDetailComponent,
    data: {
      title: 'Roster'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
