import { Component, OnInit } from '@angular/core';
import { CompetenciaService } from './competencia.service';
import { Competencia } from './competencia';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.css']
})
export class CompetenciaComponent implements OnInit {

  items: Competencia[];
  error: any;
  selectedCompetencia;

  constructor(private api: CompetenciaService) {
    this.selectedCompetencia = {id: -1, title: '', description: ''};
  }

  ngOnInit() {
    this.api.getCompetencias().subscribe(
      (items: Competencia[]) => this.items = items,
      (error: any) => this.error = error
    );
  }

  add(itemTitle: string, itemDescription: string) {
    this.api.createCompetencia(itemTitle, itemDescription).subscribe(
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
    this.api.updateCompetencia(id, title, description).subscribe(
      (item: Competencia) => {
        item.title = title;
        item.description = description;
      }
    );
    location.reload();
  }_

}
