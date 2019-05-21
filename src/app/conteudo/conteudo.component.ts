import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConteudoService } from './conteudo.service';
import { Conteudo } from './conteudo';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.css']
})
export class ConteudoComponent implements OnInit {

  items: Conteudo[];
  tipoModulos: string[] = [ "1", "2" ];
  error: any;
  selectedCurso: Curso;
  selectedDisciplina: Disciplina;
  selectedCursoDisciplina: CursoDisciplina;
  selectedConteudo;
  selectedModulo = '';
  public curso_id;
  public disciplina_id;
  public cursoDisciplina_id;

  constructor(private api: ConteudoService,
              private route: ActivatedRoute,
              private apiCurso: CursoService,
              private apiDisciplina: DisciplinaService,
              private apiCursoDisciplina: CursoDisciplinaService) {
    this.selectedConteudo = {id: -1, title: '', modulo: '', cursoDisciplina: null};
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

    this.api.getConteudos().subscribe(
      (items: Conteudo[]) =>
      {
        items.forEach
        (
          (conteudo: Conteudo) =>
          {
            if(conteudo.cursoDisciplina.id == this.cursoDisciplina_id)
              this.items.push(conteudo);
          }
        )
      }
    );
  }

  add(itemTitle: string) {
    this.api.createConteudo(itemTitle, this.selectedModulo, this.cursoDisciplina_id).subscribe(
      (item: Conteudo) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteConteudo(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  conteudoClicked(conteudo: Conteudo)
  {
    this.api.showOneConteudo(conteudo.id).subscribe(
      (item: Conteudo) => {
        this.selectedConteudo = item;
      }
    );
  }

  update(id: number, title: string, modulo: string)
  {
    this.api.updateConteudo(id, title, modulo, this.cursoDisciplina_id).subscribe(
      (item: Conteudo) => {
        item.title = title;
        item.modulo = modulo;
      }
    );
    location.reload();
  }
}
