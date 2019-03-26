import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ObjetivoService } from 'src/app/objetivo/objetivo.service';
import { AppComponent } from './app.component';
import { ObjetivoComponent } from './objetivo/objetivo.component';


@NgModule({
  declarations: [
    AppComponent,
    ObjetivoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ObjetivoService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }