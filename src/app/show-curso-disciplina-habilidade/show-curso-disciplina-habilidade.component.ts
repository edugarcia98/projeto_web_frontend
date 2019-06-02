import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { HabilidadeService } from '../habilidade/habilidade.service';
import { Habilidade } from '../habilidade/habilidade';
import { CursoDisciplinaHabilidadeService } from '../curso-disciplina-habilidade/curso-disciplina-habilidade.service';
import { CursoDisciplinaHabilidade } from '../curso-disciplina-habilidade/curso-disciplina-habilidade';

@Component({
  selector: 'app-show-curso-disciplina-habilidade',
  templateUrl: './show-curso-disciplina-habilidade.component.html',
  styleUrls: ['./show-curso-disciplina-habilidade.component.css']
})
export class ShowCursoDisciplinaHabilidadeComponent implements OnInit {

  items: CursoDisciplinaHabilidade[]
  selectedCursoDisciplinaHabilidade: CursoDisciplinaHabilidade;
  selectedHabilidade: Habilidade;
  selectedCursoDisciplina: CursoDisciplina;
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId;
  error: any;

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

    this.api.getCursoDisciplinaHabilidades().subscribe(
      (items: CursoDisciplinaHabilidade[]) =>
      {
        items.forEach
        (
          (cdh: CursoDisciplinaHabilidade) =>
          {
            if(cdh.cursoDisciplina.id == this.cursoDisciplinaId)
            {
              this.items.push(cdh);
            }
          }
        );
      }
    )
  }

  delete(id: number) {
    this.api.deleteCursoDisciplinaHabilidade(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

}
