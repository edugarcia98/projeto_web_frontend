import { Component, OnInit } from '@angular/core';
import { CursoService } from './curso.service';
import { Curso } from './curso'
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  items: Curso[];
  error: any;
  selectedCurso;

  constructor(private api: CursoService, private router: Router) {
    this.selectedCurso = {id: -1, title: '', description: ''};
  }

  ngOnInit() {
    this.api.getCursos().subscribe(
      (items: Curso[]) => this.items = items,
      (error: any) => this.error = error
    );
  }

  add(itemTitle: string, itemDescription: string) {
    this.api.createCurso(itemTitle, itemDescription).subscribe(
      (item: Curso) => this.items.push(item)
    );
    location.reload();
  }

  delete(id: number) {
    this.api.deleteCurso(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  cursoClicked(curso: Curso)
  {
    this.api.showOneCurso(curso.id).subscribe(
      (item: Curso) => {
        this.selectedCurso = item;
      }
    );
  }

  update(id: number, title: string, description: string)
  {
    this.api.updateCurso(id, title, description).subscribe(
      (item: Curso) => {
        item.title = title;
        item.description = description;
      }
    );
    location.reload();
  }

  goToObjetivos(item)
  {
    this.router.navigate([`curso/${item.id}/objetivos`]);
  }

  goToCompetencias(item)
  {
    this.router.navigate([`curso/${item.id}/competencias`]);
  }

  goToHabilidades(item)
  {
    this.router.navigate([`curso/${item.id}/habilidades`]);
  }
}
