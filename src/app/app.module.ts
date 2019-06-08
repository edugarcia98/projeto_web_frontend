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
import { RouterModule, Routes, Route } from '@angular/router';
import { HabilidadeComponent } from './habilidade/habilidade.component';
import { HabilidadeService } from './habilidade/habilidade.service';
import { DisciplinaComponent }  from './disciplina/disciplina.component'
import { DisciplinaService }    from './disciplina/disciplina.service';
import { CursoDisciplinaComponent } from './curso-disciplina/curso-disciplina.component'
import { CursoDisciplinaService } from './curso-disciplina/curso-disciplina.service';
import { ShowCursoDisciplinaComponent } from './show-curso-disciplina/show-curso-disciplina.component';
import { RegisterComponent } from './user/register/register.component';
import { RegisterService } from './user/register/register.service';
import { LoginComponent } from './user/login/login.component';
import { TurmaComponent } from './turma/turma.component'
import { TurmaService } from './turma/turma.service';
import { LivroComponent } from './livro/livro.component';
import { LivroService } from './livro/livro.service';
import { CursoDisciplinaLivroComponent } from './curso-disciplina-livro/curso-disciplina-livro.component';
import { CursoDisciplinaLivroService } from './curso-disciplina-livro/curso-disciplina-livro.service';
import { ShowCursoDisciplinaLivroComponent } from './show-curso-disciplina-livro/show-curso-disciplina-livro.component';
import { AulaComponent } from './aula/aula.component';
import { AulaService } from './aula/aula.service';
import { CursoDisciplinaObjetivoComponent } from './curso-disciplina-objetivo/curso-disciplina-objetivo.component';
import { CursoDisciplinaObjetivoService } from './curso-disciplina-objetivo/curso-disciplina-objetivo.service';
import { ShowCursoDisciplinaObjetivoComponent } from './show-curso-disciplina-objetivo/show-curso-disciplina-objetivo.component';
import { CursoDisciplinaCompetenciaComponent } from './curso-disciplina-competencia/curso-disciplina-competencia.component';
import { CursoDisciplinaCompetenciaService } from './curso-disciplina-competencia/curso-disciplina-competencia.service';
import { ShowCursoDisciplinaCompetenciaComponent } from './show-curso-disciplina-competencia/show-curso-disciplina-competencia.component';
import { CursoDisciplinaHabilidadeComponent } from './curso-disciplina-habilidade/curso-disciplina-habilidade.component';
import { CursoDisciplinaHabilidadeService } from './curso-disciplina-habilidade/curso-disciplina-habilidade.service';
import { ShowCursoDisciplinaHabilidadeComponent } from './show-curso-disciplina-habilidade/show-curso-disciplina-habilidade.component';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { ConteudoService } from './conteudo/conteudo.service';
import { MetodologiaEnsinoComponent } from './metodologia-ensino/metodologia-ensino.component';
import { MetodologiaEnsinoService } from './metodologia-ensino/metodologia-ensino.service';
import { PlanoEnsinoComponent } from './plano-ensino/plano-ensino.component';
import { PlanoAulasComponent } from './plano-aulas/plano-aulas.component';
import { AuthService } from './user/login/auth.service';


const appRoutes: Routes = [
  { path: 'curso',                  component: CursoComponent },
  { path: 'curso/:id/objetivos',    component: ObjetivoComponent },
  { path: 'curso/:id/competencias', component: CompetenciaComponent },
  { path: 'curso/:id/habilidades',  component: HabilidadeComponent },
  { path: 'disciplina', component: DisciplinaComponent },
  { path: 'curso/:id/add-disciplinas', component: CursoDisciplinaComponent },
  { path: 'curso/:id/disciplinas', component: ShowCursoDisciplinaComponent},
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/turmas', component: TurmaComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/conteudos', component: ConteudoComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/metodologias-ensino', component: MetodologiaEnsinoComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent},
  { path: 'livro', component: LivroComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/add-livros', component: CursoDisciplinaLivroComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/add-objetivos', component: CursoDisciplinaObjetivoComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/add-competencias', component: CursoDisciplinaCompetenciaComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/add-habilidades', component: CursoDisciplinaHabilidadeComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/livros', component: ShowCursoDisciplinaLivroComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/objetivos', component: ShowCursoDisciplinaObjetivoComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/competencias', component: ShowCursoDisciplinaCompetenciaComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/habilidades', component: ShowCursoDisciplinaHabilidadeComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/turma/:tid/aulas', component: AulaComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/plano-ensino', component: PlanoEnsinoComponent },
  { path: 'curso/:cId/disciplina/:dId/curso-disciplina/:cdId/turma/:tId/plano-aulas', component: PlanoAulasComponent },
  { path: 'start', component: AppComponent}
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
    LoginComponent,
    TurmaComponent,
    LivroComponent,
    CursoDisciplinaLivroComponent,
    ShowCursoDisciplinaLivroComponent,
    AulaComponent,
    CursoDisciplinaObjetivoComponent,
    ShowCursoDisciplinaObjetivoComponent,
    CursoDisciplinaCompetenciaComponent,
    ShowCursoDisciplinaCompetenciaComponent,
    CursoDisciplinaHabilidadeComponent,
    ShowCursoDisciplinaHabilidadeComponent,
    ConteudoComponent,
    MetodologiaEnsinoComponent,
    PlanoEnsinoComponent,
    PlanoAulasComponent
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
    RegisterService,
    LivroService,
    CursoDisciplinaLivroService,
    CursoDisciplinaObjetivoService,
    CursoDisciplinaCompetenciaService,
    CursoDisciplinaHabilidadeService,
    AulaService,
    ConteudoService,
    MetodologiaEnsinoService,
    AuthService
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }