import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoDisciplinaCompetenciaService } from '../curso-disciplina-competencia/curso-disciplina-competencia.service';
import { CursoDisciplinaCompetencia } from '../curso-disciplina-competencia/curso-disciplina-competencia';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { CompetenciaService } from '../competencia/competencia.service';
import { Competencia } from '../competencia/competencia';

@Component({
  selector: 'app-curso-disciplina-competencia',
  templateUrl: './curso-disciplina-competencia.component.html',
  styleUrls: ['./curso-disciplina-competencia.component.css']
})
export class CursoDisciplinaCompetenciaComponent implements OnInit {

  items: Competencia[];
  cursoDisciplinaCompetencias: CursoDisciplinaCompetencia[];
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina;
  selectedCompetencia: Competencia;
  error: any;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId

  constructor(private api: CursoDisciplinaCompetenciaService,
              private apiCursoDisciplina: CursoDisciplinaService, 
              private apiCompetencia: CompetenciaService,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private route: ActivatedRoute) { 
    this.selectedCursoDisciplina = {id: -1, curso_id: -1, disciplina_id: -1, curso: null, disciplina: null};
    this.selectedCompetencia = {id: -1, title: '', description: '', curso_id: -1, curso: null};
    this.selectedCurso = {id: -1, title: '', description: ''};
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1, ementa: ''};
    this.items = [];
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
      }
    )

    this.apiCursoDisciplina.showOneCursoDisciplina(this.cursoDisciplinaId).subscribe
    (
      (item: CursoDisciplina) => {
        this.selectedCursoDisciplina = item;
      }
    )

    this.apiCompetencia.getCompetencias().subscribe(
      (items: Competencia[]) =>
      {
        items.forEach(
          (comp: Competencia) =>
          {
            if(comp.curso.id == this.cursoId)
            {
              this.items.push(comp);
            }
          }
        );
      }
    )

    this.api.getCursoDisciplinaCompetencias().subscribe(
      (items: CursoDisciplinaCompetencia[]) => this.cursoDisciplinaCompetencias = items,
      (error: any) => this.error = error
    )
  }

  competenciaClicked(competencia: Competencia)
  {
    this.apiCompetencia.showOneCompetencia(competencia.id).subscribe(
      (item: Competencia) => {
        this.selectedCompetencia = item;
      }
    );
  }

  add(cursoDisciplina: CursoDisciplina, competencia: Competencia)
  {
    this.api.createCursoDisciplinaCompetencia(cursoDisciplina.id, competencia.id).subscribe(
      (item: CursoDisciplinaCompetencia) => {
        this.cursoDisciplinaCompetencias.push(item);
      }
    );
    location.reload();
  }
}
