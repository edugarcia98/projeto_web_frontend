import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoDisciplinaObjetivoService } from './curso-disciplina-objetivo.service';
import { CursoDisciplinaObjetivo } from './curso-disciplina-objetivo';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { ObjetivoService } from '../objetivo/objetivo.service';
import { Objetivo } from '../objetivo/objetivo';

@Component({
  selector: 'app-curso-disciplina-objetivo',
  templateUrl: './curso-disciplina-objetivo.component.html',
  styleUrls: ['./curso-disciplina-objetivo.component.css']
})
export class CursoDisciplinaObjetivoComponent implements OnInit {

  items: Objetivo[];
  cursoDisciplinaObjetivos: CursoDisciplinaObjetivo[];
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina;
  selectedObjetivo: Objetivo;
  error: any;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId

  constructor(private api: CursoDisciplinaObjetivoService,
              private apiCursoDisciplina: CursoDisciplinaService, 
              private apiObjetivo: ObjetivoService,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private route: ActivatedRoute) {
    this.selectedCursoDisciplina = {id: -1, curso_id: -1, disciplina_id: -1, curso: null, disciplina: null};
    this.selectedObjetivo = {id: -1, title: '', description: '', curso_id: -1, curso: null};
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

    this.apiObjetivo.getObjetivos().subscribe(
      (items: Objetivo[]) =>
      {
        items.forEach(
          (obj: Objetivo) =>
          {
            if(obj.curso.id == this.cursoId)
            {
              this.items.push(obj);
            }
          }
        );
      }
    )

    this.api.getCursoDisciplinaObjetivos().subscribe(
      (items: CursoDisciplinaObjetivo[]) => this.cursoDisciplinaObjetivos = items,
      (error: any) => this.error = error
    )
  }

  objetivoClicked(objetivo: Objetivo)
  {
    this.apiObjetivo.showOneObjetivo(objetivo.id).subscribe(
      (item: Objetivo) => {
        this.selectedObjetivo = item;
      }
    );
  }

  add(cursoDisciplina: CursoDisciplina, objetivo: Objetivo)
  {
    this.api.createCursoDisciplinaObjetivo(cursoDisciplina.id, objetivo.id).subscribe(
      (item: CursoDisciplinaObjetivo) => {
        this.cursoDisciplinaObjetivos.push(item);
      }
    );
    location.reload();
  }
}
