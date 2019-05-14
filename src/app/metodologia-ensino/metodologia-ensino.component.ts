import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetodologiaEnsinoService } from './metodologia-ensino.service';
import { MetodologiaEnsino } from './metodologia-ensino';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';

@Component({
  selector: 'app-metodologia-ensino',
  templateUrl: './metodologia-ensino.component.html',
  styleUrls: ['./metodologia-ensino.component.css']
})
export class MetodologiaEnsinoComponent implements OnInit {

  items: MetodologiaEnsino[];
  error: any;
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina;
  selectedMetodologiaEnsino;
  public curso_id;
  public disciplina_id;
  public cursoDisciplina_id;

  constructor(private api: MetodologiaEnsinoService,
              private route: ActivatedRoute,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private apiCursoDisciplina: CursoDisciplinaService) {
    this.selectedMetodologiaEnsino = {id: -1, description: '', cursoDisciplina: null};
    this.selectedCurso = {id: -1, title: '', description: ''};
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1, ementa: ''};
    this.selectedCursoDisciplina = {id: -1, curso_id: -1, disciplina_id: -1, curso: null, disciplina: null};
    this.items = [];
  }

  ngOnInit() {
    let cId = parseInt(this.route.snapshot.paramMap.get('cId'));
    this.curso_id = cId;

    let dId = parseInt(this.route.snapshot.paramMap.get('dId'));
    this.disciplina_id = dId;

    let cdId = parseInt(this.route.snapshot.paramMap.get('cdId'));
    this.cursoDisciplina_id = cdId;

    this.apiCurso.showOneCurso(this.curso_id).subscribe
    (
      (item: Curso) => {
        this.selectedCurso = item;
      }
    )

    this.apiDisciplina.showOneDisciplina(this.disciplina_id).subscribe
    (
      (item: Disciplina) => {
        this.selectedDisciplina = item;
      }
    )

    this.apiCursoDisciplina.showOneCursoDisciplina(this.cursoDisciplina_id).subscribe
    (
      (item: CursoDisciplina) => {
        this.selectedCursoDisciplina = item;
      }
    )

    this.api.getMetodologiasEnsino().subscribe(
      (items: MetodologiaEnsino[]) =>
      {
        items.forEach
        (
          (me: MetodologiaEnsino) =>
          {
            if(me.cursoDisciplina.id == this.cursoDisciplina_id)
              this.items.push(me);
          }
        )
      }
    );
  }

  add(itemDescription: string) {
    this.api.createMetodologiaEnsino(itemDescription, this.cursoDisciplina_id).subscribe(
      (item: MetodologiaEnsino) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteMetodologiaEnsino(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  metodologiaEnsinoClicked(metodologiaEnsino: MetodologiaEnsino)
  {
    this.api.showOneMetodologiaEnsino(metodologiaEnsino.id).subscribe(
      (item: MetodologiaEnsino) => {
        this.selectedMetodologiaEnsino = item;
      }
    );
  }

  update(id: number, description: string)
  {
    this.api.updateMetodologiaEnsino(id, description, this.cursoDisciplina_id).subscribe(
      (item: MetodologiaEnsino) => {
        item.description = description;
      }
    );
    location.reload();
  }
}
