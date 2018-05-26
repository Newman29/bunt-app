import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RulesPageComponent } from './rules-page/rules-page.component';

const routes = [{
  path: '',
  component: RulesPageComponent
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RulesRoutingModule { }
