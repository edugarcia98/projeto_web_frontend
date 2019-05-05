import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { ObjetivoService } from '../objetivo/objetivo.service';
import { Objetivo } from '../objetivo/objetivo';
import { CursoDisciplinaObjetivoService } from '../curso-disciplina-objetivo/curso-disciplina-objetivo.service';
import { CursoDisciplinaObjetivo } from '../curso-disciplina-objetivo/curso-disciplina-objetivo'

@Component({
  selector: 'app-show-curso-disciplina-objetivo',
  templateUrl: './show-curso-disciplina-objetivo.component.html',
  styleUrls: ['./show-curso-disciplina-objetivo.component.css']
})
export class ShowCursoDisciplinaObjetivoComponent implements OnInit {

  items: CursoDisciplinaObjetivo[]
  selectedCursoDisciplinaObjetivo: CursoDisciplinaObjetivo;
  selectedObjetivo: Objetivo;
  selectedCursoDisciplina: CursoDisciplina;
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId;
  error: any;

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
    
    this.api.getCursoDisciplinaObjetivos().subscribe(
      (items: CursoDisciplinaObjetivo[]) =>
      {
        items.forEach
        (
          (cdo: CursoDisciplinaObjetivo) =>
          {
            if(cdo.cursoDisciplina.id == this.cursoDisciplinaId)
            {
              this.items.push(cdo);
            }
          }
        );
      }
    )
  }

  delete(id: number) {
    this.api.deleteCursoDisciplinaObjetivo(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

}
