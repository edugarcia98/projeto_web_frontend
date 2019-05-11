import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { CursoDisciplinaObjetivoService } from '../curso-disciplina-objetivo/curso-disciplina-objetivo.service';
import { CursoDisciplinaObjetivo } from '../curso-disciplina-objetivo/curso-disciplina-objetivo';
import { ObjetivoService } from '../objetivo/objetivo.service';
import { Objetivo } from '../objetivo/objetivo';
import { CursoDisciplinaCompetenciaService } from '../curso-disciplina-competencia/curso-disciplina-competencia.service';
import { CursoDisciplinaCompetencia } from '../curso-disciplina-competencia/curso-disciplina-competencia';
import { CompetenciaService } from '../competencia/competencia.service';
import { Competencia } from '../competencia/competencia';
import { CursoDisciplinaHabilidadeService } from '../curso-disciplina-habilidade/curso-disciplina-habilidade.service';
import { CursoDisciplinaHabilidade } from '../curso-disciplina-habilidade/curso-disciplina-habilidade';
import { HabilidadeService } from '../habilidade/habilidade.service';
import { Habilidade } from '../habilidade/habilidade';
import { ConteudoService } from '../conteudo/conteudo.service';
import { Conteudo } from '../conteudo/conteudo';
import { MetodologiaEnsinoService } from '../metodologia-ensino/metodologia-ensino.service';
import { MetodologiaEnsino } from '../metodologia-ensino/metodologia-ensino';
import { CursoDisciplinaLivroService } from '../curso-disciplina-livro/curso-disciplina-livro.service';
import { CursoDisciplinaLivro } from '../curso-disciplina-livro/curso-disciplina-livro';
import { LivroService } from '../livro/livro.service';
import { Livro } from '../livro/livro';

@Component({
  selector: 'app-plano-ensino',
  templateUrl: './plano-ensino.component.html',
  styleUrls: ['./plano-ensino.component.css']
})
export class PlanoEnsinoComponent implements OnInit {

  objetivos: CursoDisciplinaObjetivo[];
  competencias: CursoDisciplinaCompetencia[];
  habilidades: CursoDisciplinaHabilidade[];
  conteudoM1: Conteudo[];
  conteudoM2: Conteudo[];
  metodologiasEnsino: MetodologiaEnsino[];
  livrosBasicos: CursoDisciplinaLivro[];
  livrosComplementares: CursoDisciplinaLivro[];
  horasTeoria: number;
  horasPratica: number;
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina
  error: any;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId
  today: Date;
  mes: number;
  dataAtual: string;

  constructor(private apiCursoDisciplina: CursoDisciplinaService,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private apiObjetivo: ObjetivoService,
              private apiCursoDisciplinaObjetivo: CursoDisciplinaObjetivoService,
              private apiCompetencia: CompetenciaService,
              private apiCursoDisciplinaCompetencia: CursoDisciplinaCompetenciaService,
              private apiHabilidade: HabilidadeService,
              private apiCursoDisciplinaHabilidade: CursoDisciplinaHabilidadeService,
              private apiConteudo: ConteudoService,
              private apiMetodologiaEnsino: MetodologiaEnsinoService,
              private apiLivro: LivroService,
              private apiCursoDisciplinaLivro: CursoDisciplinaLivroService,
              private route: ActivatedRoute) {
    this.selectedCursoDisciplina = {id: -1, curso_id: -1, disciplina_id: -1, curso: null, disciplina: null};
    this.selectedCurso = {id: -1, title: '', description: ''};
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1, ementa: ''};
    this.objetivos = [];
    this.competencias = [];
    this.habilidades = [];
    this.conteudoM1 = [];
    this.conteudoM2 = [];
    this.metodologiasEnsino = [];
    this.livrosBasicos = [];
    this.livrosComplementares = [];
    this.today = new Date();
    this.mes = this.today.getMonth() + 1;
    this.dataAtual = this.today.getDate().toString() + "/" + this.mes.toString()  + "/" + this.today.getFullYear().toString();
  }

  ngOnInit() {
    let cId = parseInt(this.route.snapshot.paramMap.get('cId'));
    this.cursoId = cId;

    let dId = parseInt(this.route.snapshot.paramMap.get('dId'));
    this.disciplinaId = dId;

    let cdId = parseInt(this.route.snapshot.paramMap.get('cdId'));
    this.cursoDisciplinaId = cdId;

    this.apiCurso.showOneCurso(this.cursoId).subscribe
    (
      (item: Curso) => {
        this.selectedCurso = item;
      }
    )
    
    this.apiDisciplina.showOneDisciplina(this.disciplinaId).subscribe
    (
      (item: Disciplina) => {
        this.selectedDisciplina = item;
        if (this.selectedDisciplina.tipo == "T")
        {
          this.horasTeoria = this.selectedDisciplina.creditos * 20;
          this.horasPratica = 0;
        }
        else
        {
          this.horasPratica = this.selectedDisciplina.creditos * 20;
          this.horasTeoria = 0;
        }
      }
    )

    this.apiCursoDisciplina.showOneCursoDisciplina(this.cursoDisciplinaId).subscribe
    (
      (item: CursoDisciplina) => {
        this.selectedCursoDisciplina = item;
      }
    )

    this.apiCursoDisciplinaObjetivo.getCursoDisciplinaObjetivos().subscribe
    (
      (items: CursoDisciplinaObjetivo[]) =>
      {
        items.forEach
        (
          (cdo: CursoDisciplinaObjetivo) =>
          {
            if(cdo.cursoDisciplina.id == this.cursoDisciplinaId)
              this.objetivos.push(cdo);
          }
        );
      }
    )

    this.apiCursoDisciplinaCompetencia.getCursoDisciplinaCompetencias().subscribe
    (
      (items: CursoDisciplinaCompetencia[]) =>
      {
        items.forEach
        (
          (cdc: CursoDisciplinaCompetencia) =>
          {
            if(cdc.cursoDisciplina.id == this.cursoDisciplinaId)
              this.competencias.push(cdc);
          }
        );
      }
    )

    this.apiCursoDisciplinaHabilidade.getCursoDisciplinaHabilidades().subscribe
    (
      (items: CursoDisciplinaHabilidade[]) =>
      {
        items.forEach
        (
          (cdh: CursoDisciplinaHabilidade) =>
          {
            if(cdh.cursoDisciplina.id == this.cursoDisciplinaId)
              this.habilidades.push(cdh);
          }
        );
      }
    )

    this.apiConteudo.getConteudos().subscribe
    (
      (items: Conteudo[]) =>
      {
        items.forEach
        (
          (c: Conteudo) =>
          {
            if(c.cursoDisciplina.id == this.cursoDisciplinaId)
            {
              if(c.modulo == "1")
                this.conteudoM1.push(c);
              else
                this.conteudoM2.push(c);
            }
          }
        );
      }
    )

    this.apiMetodologiaEnsino.getMetodologiasEnsino().subscribe
    (
      (items: MetodologiaEnsino[]) =>
      {
        items.forEach
        (
          (me: MetodologiaEnsino) =>
          {
            if(me.cursoDisciplina.id == this.cursoDisciplinaId)
              this.metodologiasEnsino.push(me);
          }
        )
      }
    )

    this.apiCursoDisciplinaLivro.getCursoDisciplinaLivros().subscribe
    (
      (items: CursoDisciplinaLivro[]) =>
      {
        items.forEach
        (
          (cdl: CursoDisciplinaLivro) =>
          {
            if(cdl.cursoDisciplina.id == this.cursoDisciplinaId)
            {
              if(cdl.livro.bibliografia == "B")
                this.livrosBasicos.push(cdl);
              else
                this.livrosComplementares.push(cdl);
            }
          }
        );
      }
    )
  }

}
