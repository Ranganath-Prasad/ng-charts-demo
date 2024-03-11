import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StackedBarComponent } from './stacked-bar/stacked-bar.component';
import { HttpClientModule } from  '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { LineComponent } from './line/line.component';


@NgModule({
  declarations: [
    AppComponent,
    StackedBarComponent,
    LineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
