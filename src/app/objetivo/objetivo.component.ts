import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjetivoService } from './objetivo.service'
import { Objetivo } from './objetivo';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';

@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.component.html',
  styleUrls: ['./objetivo.component.css']
})
export class ObjetivoComponent implements OnInit {

  items: Objetivo[];
  error: any;
  selectedCurso: Curso;
  selectedObjetivo;
  public cursoId;
  public new_objetivo: any;

  constructor(private api: ObjetivoService,
              private route: ActivatedRoute,
              private apiCurso: CursoService) {
    this.selectedObjetivo = {id: -1, title: '', description: '', curso: null};
    this.selectedCurso = {id: -1, title: '', description: ''};
    this.items = [];
  }

  ngOnInit() {
    this.new_objetivo = {};

    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.cursoId = id;

    this.apiCurso.showOneCurso(this.cursoId).subscribe
    (
      (item: Curso) => {
        this.selectedCurso = item;
      }
    )

    this.api.getObjetivos().subscribe(
      (items: Objetivo[]) => 
      {
        console.log(this.items);
        items.forEach
        (
          (obj: Objetivo) =>
          {
            if(obj.curso.id == this.cursoId)
              this.items.push(obj);
          }
        )
      }
    );
  }

  add(itemTitle: string, itemDescription: string) {
    this.api.createObjetivo(itemTitle, itemDescription, this.cursoId).subscribe(
      (item: Objetivo) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteObjetivo(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  objetivoClicked(objetivo: Objetivo)
  {
    this.api.showOneObjetivo(objetivo.id).subscribe(
      (item: Objetivo) => {
        this.selectedObjetivo = item;
      }
    );
  }

  update(id: number, title: string, description: string)
  {
    this.api.updateObjetivo(id, title, description, this.cursoId).subscribe(
      (item: Objetivo) => {
        item.title = title;
        item.description = description;
      }
    );
    location.reload();
  }
}
