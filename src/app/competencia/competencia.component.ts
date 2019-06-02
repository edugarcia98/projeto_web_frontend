import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetenciaService } from './competencia.service';
import { Competencia } from './competencia';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.css']
})
export class CompetenciaComponent implements OnInit {

  items: Competencia[];
  error: any;
  selectedCurso: Curso;
  selectedCompetencia;
  public cursoId;

  constructor(private api: CompetenciaService,
              private route: ActivatedRoute,
              private apiCurso: CursoService) {
    this.selectedCompetencia = {id: -1, title: '', description: '', curso: null};
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

    this.api.getCompetencias().subscribe(
      (items: Competencia[]) => 
      {
        items.forEach
        (
          (comp: Competencia) =>
          {
            if(comp.curso.id == this.cursoId)
              this.items.push(comp);
          }
        )
      }
    );
  }

  add(itemTitle: string, itemDescription: string) {
    this.api.createCompetencia(itemTitle, itemDescription, this.cursoId).subscribe(
      (item: Competencia) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteCompetencia(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  competenciaClicked(competencia: Competencia)
  {
    this.api.showOneCompetencia(competencia.id).subscribe(
      (item: Competencia) => {
        this.selectedCompetencia = item;
      }
    );
  }

  update(id: number, title: string, description: string)
  {
    this.api.updateCompetencia(id, title, description, this.cursoId).subscribe(
      (item: Competencia) => {
        item.title = title;
        item.description = description;
      }
    );
    location.reload();
  }_

}
