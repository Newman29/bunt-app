import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandingsPageComponent } from './standings-page/standings-page.component';

const routes: Routes = [{
  path: '',
  component: StandingsPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingsRoutingModule { }
