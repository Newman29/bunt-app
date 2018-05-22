import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamsPageComponent } from './teams-page.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';

const routes: Routes = [
  {
    path: 'teams',
    component: TeamsPageComponent,
    data: {
      title: 'Teams'
    }
  },
  {
    path: 'team/:id',
    component: TeamDetailComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  declarations: []
})
export class TeamsRoutingModule { }
