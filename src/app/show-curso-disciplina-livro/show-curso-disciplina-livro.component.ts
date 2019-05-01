import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { LivroService } from '../livro/livro.service';
import { Livro } from '../livro/livro';
import { CursoDisciplinaLivroService } from '../curso-disciplina-livro/curso-disciplina-livro.service';
import { CursoDisciplinaLivro } from '../curso-disciplina-livro/curso-disciplina-livro';

@Component({
  selector: 'app-show-curso-disciplina-livro',
  templateUrl: './show-curso-disciplina-livro.component.html',
  styleUrls: ['./show-curso-disciplina-livro.component.css']
})
export class ShowCursoDisciplinaLivroComponent implements OnInit {

  items: CursoDisciplinaLivro[];
  selectedCursoDisciplinaLivro: CursoDisciplinaLivro;
  selectedLivro: Livro;
  selectedCursoDisciplina: CursoDisciplina;
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId;
  error: any;

  constructor(private api: CursoDisciplinaLivroService,
              private apiCursoDisciplina: CursoDisciplinaService,
              private apiLivro: LivroService,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private route: ActivatedRoute) { 
    this.selectedCursoDisciplina = {id: -1, curso_id: -1, disciplina_id: -1, curso: null, disciplina: null};
    this.selectedLivro = {id: -1, title: '', autor: '', bibliografia: ''};
    this.selectedCurso = {id: -1, title: '', description: ''};
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1};
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

    this.api.getCursoDisciplinaLivros().subscribe
    (
      (items: CursoDisciplinaLivro[]) =>
      {
        items.forEach
        (
          (cdl: CursoDisciplinaLivro) =>
          {
            if(cdl.cursoDisciplina.id == this.cursoDisciplinaId)
            {
              this.items.push(cdl);
            }
          }
        )
      }
    )
  }

  delete(id: number) {
    this.api.deleteCursoDisciplinaLivro(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

}
