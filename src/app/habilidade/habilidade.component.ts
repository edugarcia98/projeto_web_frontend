import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabilidadeService } from './habilidade.service';
import { Habilidade } from './habilidade';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';

@Component({
  selector: 'app-habilidade',
  templateUrl: './habilidade.component.html',
  styleUrls: ['./habilidade.component.css']
})
export class HabilidadeComponent implements OnInit {

  items: Habilidade[];
  error: any;
  selectedCurso: Curso;
  selectedHabilidade;
  public cursoId;

  constructor(private api: HabilidadeService,
              private route: ActivatedRoute,
              private apiCurso: CursoService) {
  this.selectedHabilidade = {id: -1, title: '', description: '', curso: null};
  this.selectedCurso = {id: -1, title: '', description: '', coordenador_id: -1, coordenador: null};
  this.items = [];
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

    this.api.getHabilidades().subscribe(
      (items: Habilidade[]) => 
      {
        items.forEach
        (
          (hab: Habilidade) =>
          {
            if(hab.curso.id == this.cursoId)
              this.items.push(hab);
          }
        )
      }
    );
  }

  add(itemTitle: string, itemDescription: string) {
    this.api.createHabilidade(itemTitle, itemDescription, this.cursoId).subscribe(
      (item: Habilidade) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteHabilidade(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  habilidadeClicked(habilidade: Habilidade)
  {
    this.api.showOneHabilidade(habilidade.id).subscribe(
      (item: Habilidade) => {
        this.selectedHabilidade = item;
      }
    );
  }

  update(id: number, title: string, description: string)
  {
    this.api.updateHabilidade(id, title, description, this.cursoId).subscribe(
      (item: Habilidade) => {
        item.title = title;
        item.description = description;
      }
    );
    location.reload();
  }_
}
