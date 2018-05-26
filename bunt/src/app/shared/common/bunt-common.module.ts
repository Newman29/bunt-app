import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PctPipe } from './pipes/pct.pipe';
import { FancyTitleComponent } from './components/fancy-title/fancy-title.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    PctPipe,
    FancyTitleComponent
  ],
  exports: [
    PctPipe,
    FancyTitleComponent
  ]
})
export class BuntCommonModule { }
