import { Component, OnInit } from '@angular/core';
import { CursoService } from './curso.service';
import { Curso } from './curso'
import { RegisterService } from '../user/register/register.service';
import { Register } from '../user/register/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  public isCollapsed = false;
  items: Curso[];
  coordenadores: Register[];
  error: any;
  selectedCurso;
  selectedCoordenador = 0;

  constructor(private api: CursoService,
              private apiRegister: RegisterService,
              private router: Router) {
    this.selectedCurso = {id: -1, title: '', description: ''};
    this.coordenadores = [];      
  }
  

  ngOnInit() {
    this.api.getCursos().subscribe(
      (items: Curso[]) => this.items = items,
      (error: any) => this.error = error
    );

    this.apiRegister.getRegisters().subscribe(
      (items: Register[]) => 
      {
        items.forEach
        (
          (item: Register) =>
          {
            if(item.tipo == 'C')
            {
              this.coordenadores.push(item);
            }
          }
        );
      }
    )
  }

  add(itemTitle: string, itemDescription: string) {
    console.log(this.selectedCoordenador);
    this.api.createCurso(itemTitle, itemDescription, this.selectedCoordenador).subscribe(
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
    this.api.updateCurso(id, title, description, this.selectedCoordenador).subscribe(
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

  goToAddDisciplinas(item)
  {
    this.router.navigate([`curso/${item.id}/add-disciplinas`]);
  }

  goToDisciplinas(item)
  {
    this.router.navigate([`curso/${item.id}/disciplinas`])
  }
}
