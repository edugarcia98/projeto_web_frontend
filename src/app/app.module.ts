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
import { HabilidadeComponent } from './habilidade/habilidade.component';
import { HabilidadeService } from './habilidade/habilidade.service';
import { DisciplinaComponent }  from './disciplina/disciplina.component'
import { DisciplinaService }    from './disciplina/disciplina.service'


const appRoutes: Routes = [
  { path: 'curso',                  component: CursoComponent },
  { path: 'curso/:id/objetivos',    component: ObjetivoComponent },
  { path: 'curso/:id/competencias', component: CompetenciaComponent },
  { path: 'curso/:id/habilidades',  component: HabilidadeComponent },
  { path: 'disciplina', component: DisciplinaComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ObjetivoComponent,
    CompetenciaComponent,
    CursoComponent,
    HabilidadeComponent,
    DisciplinaComponent
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
    HabilidadeService,
    CursoService,
    DisciplinaService
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }