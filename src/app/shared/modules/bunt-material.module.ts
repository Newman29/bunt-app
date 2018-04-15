import { NgModule } from '@angular/core';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule } from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule
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
