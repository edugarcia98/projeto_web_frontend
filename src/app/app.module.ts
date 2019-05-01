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
import { DisciplinaService }    from './disciplina/disciplina.service';
import { CursoDisciplinaComponent } from './curso-disciplina/curso-disciplina.component'
import { CursoDisciplinaService } from './curso-disciplina/curso-disciplina.service';
import { ShowCursoDisciplinaComponent } from './show-curso-disciplina/show-curso-disciplina.component';
import { RegisterComponent } from './register/register.component'
import { RegisterServiceService } from './register/register-service.service';
import { TurmaComponent } from './turma/turma.component'
import { TurmaService } from './turma/turma.service';
import { LivroComponent } from './livro/livro.component';
import { LivroService } from './livro/livro.service';
import { CursoDisciplinaLivroComponent } from './curso-disciplina-livro/curso-disciplina-livro.component';
import { CursoDisciplinaLivroService } from './curso-disciplina-livro/curso-disciplina-livro.service';


const appRoutes: Routes = [
  { path: 'curso',                  component: CursoComponent },
  { path: 'curso/:id/objetivos',    component: ObjetivoComponent },
  { path: 'curso/:id/competencias', component: CompetenciaComponent },
  { path: 'curso/:id/habilidades',  component: HabilidadeComponent },
  { path: 'disciplina', component: DisciplinaComponent },
  { path: 'curso/:id/add-disciplinas', component: CursoDisciplinaComponent },
  { path: 'curso/:id/disciplinas', component: ShowCursoDisciplinaComponent},
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/turmas', component: TurmaComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'livro', component: LivroComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/add-livros', component: CursoDisciplinaLivroComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ObjetivoComponent,
    CompetenciaComponent,
    CursoComponent,
    HabilidadeComponent,
    DisciplinaComponent,
    CursoDisciplinaComponent,
    ShowCursoDisciplinaComponent,
    RegisterComponent,
    TurmaComponent,
    LivroComponent,
    CursoDisciplinaLivroComponent
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
    DisciplinaService,
    CursoDisciplinaService,
    TurmaService,
    RegisterServiceService,
    LivroService,
    CursoDisciplinaLivroService
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }