import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoDisciplinaLivroService } from './curso-disciplina-livro.service';
import { CursoDisciplinaLivro } from './curso-disciplina-livro';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { LivroService } from '../livro/livro.service';
import { Livro } from '../livro/livro';

@Component({
  selector: 'app-curso-disciplina-livro',
  templateUrl: './curso-disciplina-livro.component.html',
  styleUrls: ['./curso-disciplina-livro.component.css']
})
export class CursoDisciplinaLivroComponent implements OnInit {

  items: Livro[];
  cursoDisciplinaLivros: CursoDisciplinaLivro[];
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina;
  selectedLivro: Livro;
  error: any;
  public cursoId;
  public disciplinaId;
  public cursoDisciplinaId

  constructor(private api: CursoDisciplinaLivroService,
              private apiCursoDisciplina: CursoDisciplinaService,
              private apiLivro: LivroService,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private route: ActivatedRoute) { 
    this.selectedCursoDisciplina = {id: -1, curso_id: -1, disciplina_id: -1, curso: null, disciplina: null};
    this.selectedLivro = {id: -1, title: '', autor: '', bibliografia: ''};
    this.selectedCurso = {id: -1, title: '', description: '', coordenador_id: -1, coordenador: null};
    this.selectedDisciplina = {id: -1, title: '', tipo: '', creditos: -1, ementa: '', professor_id: -1, professor: null};
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

    this.apiLivro.getLivros().subscribe(
      (items: Livro[]) => this.items = items,
      (error: any) => this.error = error
    )

    this.api.getCursoDisciplinaLivros().subscribe(
      (items: CursoDisciplinaLivro[]) => this.cursoDisciplinaLivros = items,
      (error: any) => this.error = error
    )
  }

  livroClicked(livro: Livro)
  {
    this.apiLivro.showOneLivro(livro.id).subscribe(
      (item: Livro) => {
        this.selectedLivro = item;
      }
    );
  }

  add(cursoDisciplina: CursoDisciplina, livro: Livro)
  {
    this.api.createCursoDisciplinaLivro(cursoDisciplina.id, livro.id).subscribe(
      (item: CursoDisciplinaLivro) => this.cursoDisciplinaLivros.push(item)
    );
    location.reload();
  }
}
