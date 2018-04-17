import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule
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
