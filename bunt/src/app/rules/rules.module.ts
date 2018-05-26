import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RulesRoutingModule } from './rules-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';

const MaterialModule = [
  MatIconModule,
  MatButtonModule
];
@NgModule({
  imports: [
    CommonModule,
    PdfViewerModule,
    ...MaterialModule,
    RulesRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    RulesPageComponent
  ]
})
export class RulesModule { }
