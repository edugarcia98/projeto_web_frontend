import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { CompetenciaService } from '../competencia/competencia.service';
import { Competencia } from '../competencia/competencia';
import { CursoDisciplinaCompetenciaService } from '../curso-disciplina-competencia/curso-disciplina-competencia.service';
import { CursoDisciplinaCompetencia } from '../curso-disciplina-competencia/curso-disciplina-competencia';

@Component({
  selector: 'app-show-curso-disciplina-competencia',
  templateUrl: './show-curso-disciplina-competencia.component.html',
  styleUrls: ['./show-curso-disciplina-competencia.component.css']
})
export class ShowCursoDisciplinaCompetenciaComponent implements OnInit {

  items: CursoDisciplinaCompetencia[]
  selectedCursoDisciplinaCompetencia: CursoDisciplinaCompetencia;
  selectedCompetencia: Competencia;
  selectedCursoDisciplina: CursoDisciplina;
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId;
  error: any;

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

    this.api.getCursoDisciplinaCompetencias().subscribe(
      (items: CursoDisciplinaCompetencia[]) =>
      {
        items.forEach
        (
          (cdc: CursoDisciplinaCompetencia) =>
          {
            if(cdc.cursoDisciplina.id == this.cursoDisciplinaId)
            {
              this.items.push(cdc);
            }
          }
        );
      }
    )
  }

  delete(id: number) {
    this.api.deleteCursoDisciplinaCompetencia(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

}
