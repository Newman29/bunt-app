import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuntMaterialModule } from '../shared/modules/bunt-material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { PagesModule } from '../pages/pages.module';
import { BuntRoutingModule } from '../bunt-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PagesModule,
    BuntRoutingModule,
    BuntMaterialModule
  ],
  declarations: [
    MainContentComponent,
    ToolbarComponent,
    HeaderComponent
  ],
  exports: [
    MainContentComponent,
    ToolbarComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }
