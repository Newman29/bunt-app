import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatSelectModule,
  MatGridListModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatSelectModule,
  MatGridListModule
];

@NgModule({
  imports: [
    ...modules
  ],
  declarations: [],
  exports: [
    ...modules
  ]
})
export class BuntMaterialModule { }
