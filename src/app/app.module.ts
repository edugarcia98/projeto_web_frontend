import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ObjetivoService } from 'src/app/objetivo/objetivo.service';
import { CompetenciaService } from 'src/app/competencia/competencia.service';
import { AppComponent } from './app.component';
import { ObjetivoComponent } from './objetivo/objetivo.component';
import { CompetenciaComponent } from './competencia/competencia.component';
import { CursoComponent } from './curso/curso.component';
import { CursoService } from './curso/curso.service';
import { RouterModule, Routes } from '@angular/router';
import { CursoObjetivoComponent } from './curso-objetivo/curso-objetivo.component';
import { CursoObjetivoService } from './curso-objetivo/curso-objetivo.service';


const appRoutes: Routes = [
  { path: 'objetivo',     component: ObjetivoComponent },
  { path: 'competencia',    component: CompetenciaComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'curso-objetivo/:id', component: CursoObjetivoComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ObjetivoComponent,
    CompetenciaComponent,
    CursoComponent,
    CursoObjetivoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    ObjetivoService,
    CompetenciaService,
    CursoService,
    CursoObjetivoService
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }