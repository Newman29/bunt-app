import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { BuntRoutingModule } from '../bunt-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

const MaterialModule = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  OverlayModule
];

@NgModule({
  imports: [
    CommonModule,
    BuntRoutingModule,
    ...MaterialModule
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
