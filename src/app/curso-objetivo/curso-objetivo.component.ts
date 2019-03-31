import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/curso/curso.service';
import { Curso } from 'src/app/curso/curso';
import { ObjetivoService } from 'src/app/objetivo/objetivo.service'
import { Objetivo } from 'src/app/objetivo/objetivo' 
import { CursoObjetivoService } from './curso-objetivo.service';
import { CursoObjetivo } from './curso-objetivo';


@Component({
  selector: 'app-curso-objetivo',
  templateUrl: './curso-objetivo.component.html',
  styleUrls: ['./curso-objetivo.component.css']
})
export class CursoObjetivoComponent implements OnInit {

  items: Objetivo[];
  objetivos: Objetivo[];
  cursosObjetivo: CursoObjetivo[];
  curso: Curso;
  cursoId: number;
  cursoTitle: string;
  cursoDescription: string;

  constructor(private route: ActivatedRoute, 
              private api: CursoService,
              private api2: ObjetivoService,
              private api3: CursoObjetivoService) { }

  ngOnInit() 
  {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.cursoId = id;

    this.api3.getCursosObjetivo().subscribe
    (
      (cos: CursoObjetivo[]) => 
      {
        this.cursosObjetivo = cos;
      }
    )

    this.api.getCursos().subscribe
    (
      (items: Curso[]) =>
      {
        items.forEach
        (
          (c: Curso) =>
          {
            if(c.id == this.cursoId)
            {
              this.curso = c;
              this.cursoTitle = c.title;
              this.cursoDescription = c.description;
              this.items = c.objetivos;
            }
          }
        );
      }
    );
  }

  add(itemTitle: string, itemDescription: string, id: number) {

    this.api2.getObjetivos().subscribe
    (
      (items: Objetivo[]) => this.objetivos = items
    );

    this.api2.createObjetivo(itemTitle, itemDescription).subscribe
    (
      (item: Objetivo) => 
      {
        this.objetivos.push(item);
        this.api3.createCursoObjetivo(this.curso, item).subscribe
        (
          (co: CursoObjetivo) => 
          {
            console.log(this.curso);
            console.log(item);
            co.curso = this.curso;
            co.objetivo = item;
            console.log(co);
            this.cursosObjetivo.push(co);
          }
        )
      }
    );
    //location.reload();
  }

}
