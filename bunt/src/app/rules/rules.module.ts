import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BuntMaterialModule } from '../shared/modules/bunt-material.module';
import { RulesRoutingModule } from './rules-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    PdfViewerModule,
    BuntMaterialModule,
    RulesRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    RulesPageComponent
  ]
})
export class RulesModule { }
