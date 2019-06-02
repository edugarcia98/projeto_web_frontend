import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AulaService } from './aula.service';
import { Aula, TipoAula } from './aula';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { TurmaService } from '../turma/turma.service';
import { Turma } from '../turma/turma';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  items: Aula[];
  tiposAula: TipoAula[] = 
  [
    { id: 'T', title: 'Teórica' },
    { id: 'P', title: 'Prática' },
    { id: '-', title: 'Nenhum' }
  ]
  error: any;
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina;
  selectedTurma: Turma;
  selectedAula;
  selectedTipoAula;
  public curso_id;
  public disciplina_id;
  public cursoDisciplina_id;
  public turma_id;

  constructor(private api: AulaService,
              private route: ActivatedRoute,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private apiCursoDisciplina: CursoDisciplinaService,
              private apiTurma: TurmaService) {
    this.selectedAula = {id: -1, semana: -1, data: null, tipo: '', conteudo: '', turma_id: -1, turma: null};
    this.selectedTurma = {id: -1, codigo: '', semestre: '', recursos: '', cursoDisciplina_id: -1, cursoDisciplina: null};
    this.selectedCurso = {id: -1, title: '', description: '', coordenador_id: -1, coordenador: null};
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1, ementa: '', professor_id: -1, professor: null};
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

    let tId = parseInt(this.route.snapshot.paramMap.get('tid'));
    this.turma_id = tId;

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

    this.apiTurma.showOneTurma(this.turma_id).subscribe(
      (item: Turma) => {
        this.selectedTurma = item;
      }
    )

    this.api.getAulas().subscribe(
      (items: Aula[]) =>
      {
        items.forEach
        (
          (aula: Aula) =>
          {
            if(aula.turma.id == this.turma_id)
            {
              this.items.push(aula);
            }
          }
        )
      }
    );
  }

  add(itemSemana: number, itemData: Date, itemConteudo: string)
  {
    this.api.createAula(itemSemana, itemData, this.selectedTipoAula, itemConteudo, this.turma_id).subscribe(
      (item: Aula) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteAula(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  aulaClicked(turma: Turma)
  {
    this.api.showOneAula(turma.id).subscribe(
      (item: Aula) => {
        this.selectedAula = item;
      }
    );
  }

  update(id: number, semana: number, data: Date, tipo: string, conteudo: string)
  {
    this.api.updateAula(id, semana, data, tipo, conteudo, this.turma_id).subscribe(
      (item: Aula) => {
        item.semana = semana;
        item.data = data;
        item.tipo = tipo;
        item.conteudo = conteudo;
      }
    );
    location.reload();
  }
}
