import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoDisciplinaTurmaService } from './curso-disciplina-turma.service';
import { CursoDisciplinaTurma } from './curso-disciplina-turma';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
//import { TurmaService } from './turma.service';
//import { Turma } from './turma';

@Component({
  selector: 'app-curso-disciplina-turma',
  templateUrl: './curso-disciplina-turma.component.html',
  styleUrls: ['./curso-disciplina-turma.component.css']
})
export class CursoDisciplinaTurmaComponent implements OnInit {

  cots: CursoDisciplinaTurma[];
  //turmas: Turma[];
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina;
  error: any;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId;

  constructor(private api: CursoDisciplinaTurmaService,
              private apiCursoDisciplina: CursoDisciplinaService,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private route: ActivatedRoute) {
    this.selectedCursoDisciplina = {id: -1, curso_id: -1, disciplina_id: -1, curso: null, disciplina: null};
    this.selectedCurso = {id: -1, title: '', description: ''};
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1};
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

    this.api.getCursosDisciplinaTurmas().subscribe
    (
      (items: CursoDisciplinaTurma[]) => this.cots = items,
      (error: any) => this.error = error
    )
    
    //this.apiTurma.getTurmas().subscribe
    //(
    //  (items: Turma[]) => this.turmas = items,
    //  (error: any) => this.error = error
    //)
  }

  add(itemCodigo: string, cursoDisciplina: CursoDisciplina)
  {
    //this.api.createCursoDisciplinaTurma(curso.id, disciplina.id).subscribe(
    //  (item: CursoDisciplina) => this.cursosDisciplina.push(item)
    //);
    //location.reload();
  }

}
