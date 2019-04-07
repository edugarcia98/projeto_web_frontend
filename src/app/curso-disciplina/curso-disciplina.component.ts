import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoDisciplinaService } from './curso-disciplina.service';
import { CursoDisciplina } from './curso-disciplina';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';

@Component({
  selector: 'app-curso-disciplina',
  templateUrl: './curso-disciplina.component.html',
  styleUrls: ['./curso-disciplina.component.css']
})
export class CursoDisciplinaComponent implements OnInit {

  items: Disciplina[];
  cursosDisciplina: CursoDisciplina[];
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  error: any;
  public cursoId;

  constructor(private api: CursoDisciplinaService,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private route: ActivatedRoute) {
    this.selectedCurso = {id: -1, title: '', description: ''};
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1};
  
  }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.cursoId = id;

    this.apiCurso.showOneCurso(this.cursoId).subscribe
    (
      (item: Curso) => {
        this.selectedCurso = item;
      }
    )

    this.apiDisciplina.getDisciplinas().subscribe(
      (items: Disciplina[]) => this.items = items,
      (error: any) => this.error = error
    );

    this.api.getCursosDisciplina().subscribe
    (
      (items: CursoDisciplina[]) => this.cursosDisciplina = items,
      (error: any) => this.error = error
    )
  }

  disciplinaClicked(disciplina: Disciplina)
  {
    this.apiDisciplina.showOneDisciplina(disciplina.id).subscribe(
      (item: Disciplina) => {
        this.selectedDisciplina = item;
      }
    );
  }

  add(curso: Curso, disciplina: Disciplina)
  {
    this.api.createCursoDisciplina(curso.id, disciplina.id).subscribe(
      (item: CursoDisciplina) => this.cursosDisciplina.push(item)
    );
    location.reload();
  }
}
