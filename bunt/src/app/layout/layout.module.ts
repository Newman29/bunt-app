import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { BuntRoutingModule } from '../bunt-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';

const MaterialModule = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
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
