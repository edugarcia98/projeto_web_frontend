import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoDisciplinaHabilidadeService } from '../curso-disciplina-habilidade/curso-disciplina-habilidade.service';
import { CursoDisciplinaHabilidade } from '../curso-disciplina-habilidade/curso-disciplina-habilidade';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { HabilidadeService } from '../habilidade/habilidade.service';
import { Habilidade } from '../habilidade/habilidade';

@Component({
  selector: 'app-curso-disciplina-habilidade',
  templateUrl: './curso-disciplina-habilidade.component.html',
  styleUrls: ['./curso-disciplina-habilidade.component.css']
})
export class CursoDisciplinaHabilidadeComponent implements OnInit {

  items: Habilidade[];
  cursoDisciplinaHabilidades: CursoDisciplinaHabilidade[];
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina;
  selectedHabilidade: Habilidade;
  error: any;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId

  constructor(private api: CursoDisciplinaHabilidadeService,
              private apiCursoDisciplina: CursoDisciplinaService, 
              private apiHabilidade: HabilidadeService,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private route: ActivatedRoute) {
    this.selectedCursoDisciplina = {id: -1, curso_id: -1, disciplina_id: -1, curso: null, disciplina: null};
    this.selectedHabilidade = {id: -1, title: '', description: '', curso_id: -1, curso: null};
    this.selectedCurso = {id: -1, title: '', description: '', coordenador_id: -1, coordenador: null};
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1, ementa: '', professor_id: -1, professor: null};
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

    this.apiHabilidade.getHabilidades().subscribe(
      (items: Habilidade[]) =>
      {
        items.forEach(
          (hab: Habilidade) =>
          {
            if(hab.curso.id == this.cursoId)
            {
              this.items.push(hab);
            }
          }
        );
      }
    )

    this.api.getCursoDisciplinaHabilidades().subscribe(
      (items: CursoDisciplinaHabilidade[]) => this.cursoDisciplinaHabilidades = items,
      (error: any) => this.error = error
    )
  }

  habilidadeClicked(habilidade: Habilidade)
  {
    this.apiHabilidade.showOneHabilidade(habilidade.id).subscribe(
      (item: Habilidade) => {
        this.selectedHabilidade = item;
      }
    );
  }

  add(cursoDisciplina: CursoDisciplina, habilidade: Habilidade)
  {
    this.api.createCursoDisciplinaHabilidade(cursoDisciplina.id, habilidade.id).subscribe(
      (item: CursoDisciplinaHabilidade) => {
        this.cursoDisciplinaHabilidades.push(item);
      }
    );
    location.reload();
  }

}

  