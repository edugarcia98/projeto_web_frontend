import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TurmaService } from './turma.service';
import { Turma } from './turma';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  items: Turma[];
  error: any;
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina;
  selectedTurma;
  public curso_id;
  public disciplina_id;
  public cursoDisciplina_id;

  constructor(private api: TurmaService,
              private route: ActivatedRoute,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private apiCursoDisciplina: CursoDisciplinaService,
              private router: Router) {
      this.selectedTurma = {id: -1, codigo: '', cursoDisciplina: null};
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
        console.log(this.selectedCurso);
      }
    )

    this.apiDisciplina.showOneDisciplina(this.disciplina_id).subscribe
    (
      (item: Disciplina) => {
        this.selectedDisciplina = item;
        console.log(this.selectedDisciplina);
      }
    )

    this.apiCursoDisciplina.showOneCursoDisciplina(this.cursoDisciplina_id).subscribe
    (
      (item: CursoDisciplina) => {
        this.selectedCursoDisciplina = item;
        console.log(this.selectedCursoDisciplina);
      }
    )

    this.api.getTurmas().subscribe(
      (items: Turma[]) =>
      {
        items.forEach
        (
          (turma: Turma) =>
          {
            if(turma.cursoDisciplina.id == this.cursoDisciplina_id)
              this.items.push(turma);
          }
        )
      }
    );
  }

  add(itemCodigo: string, itemSemestre: string, itemRecursos: string) {
    this.api.createTurma(itemCodigo, itemSemestre, itemRecursos, this.cursoDisciplina_id).subscribe(
      (item: Turma) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteTurma(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  turmaClicked(turma: Turma)
  {
    this.api.showOneTurma(turma.id).subscribe(
      (item: Turma) => {
        this.selectedTurma = item;
      }
    );
  }

  update(id: number, codigo: string, semestre: string, recursos: string)
  {
    this.api.updateTurma(id, codigo, semestre, recursos, this.cursoDisciplina_id).subscribe(
      (item: Turma) => {
        item.codigo = codigo;
      }
    );
    location.reload();
  }

  goToAulas(item)
  {
    this.router.navigate([`curso/${item.cursoDisciplina.curso.id}/disciplina/${item.cursoDisciplina.disciplina.id}/curso-disciplina/${item.cursoDisciplina.id}/turma/${item.id}/aulas`])
  }

  goToPlanoAulas(item)
  {
    this.router.navigate([`curso/${item.cursoDisciplina.curso.id}/disciplina/${item.cursoDisciplina.disciplina.id}/curso-disciplina/${item.cursoDisciplina.id}/turma/${item.id}/plano-aulas`])
  }

}
