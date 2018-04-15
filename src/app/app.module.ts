import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

import { MatSidenavModule } from '@angular/material';
import { BuntRoutingModule } from './bunt-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BuntRoutingModule,
    MatSidenavModule,
    LayoutModule,
    BuntRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }