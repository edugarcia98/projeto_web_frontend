import { Component, OnInit } from '@angular/core';
import { CursoService } from '../curso/curso.service';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../curso/curso';
import { DisciplinaService } from '../disciplina/disciplina.service';
import { Disciplina } from '../disciplina/disciplina';
import { CursoDisciplinaService } from '../curso-disciplina/curso-disciplina.service';
import { CursoDisciplina } from '../curso-disciplina/curso-disciplina';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-curso-disciplina',
  templateUrl: './show-curso-disciplina.component.html',
  styleUrls: ['./show-curso-disciplina.component.css']
})
export class ShowCursoDisciplinaComponent implements OnInit {

  items: CursoDisciplina[];
  selectedCursoDisciplina: CursoDisciplina;
  selectedCurso: Curso;
  public cursoId;
  error: any;

  constructor(private api: CursoDisciplinaService,
    private apiCurso: CursoService,
    private apiDisciplina: DisciplinaService,
    private route: ActivatedRoute,
    private router: Router) {
    this.selectedCursoDisciplina = {id: -1, curso_id: -1, disciplina_id: -1, curso: null, disciplina: null};
    this.selectedCurso = {id: -1, title: '', description: ''};
    this.items = [];
  }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.cursoId = id;

    this.apiCurso.showOneCurso(this.cursoId).subscribe
    (
      (item: Curso) => {
        this.selectedCurso = item;
        console.log(this.selectedCurso);
      }
    )
    
    this.api.getCursosDisciplina().subscribe
    (
      (items: CursoDisciplina[]) =>
      {
        items.forEach
        (
          (cd: CursoDisciplina) =>
          {
            if(cd.curso.id == this.cursoId)
            {
              this.items.push(cd);
            }
          }
        )
      }
    )
  }

  delete(id: number) {
    this.api.deleteCursoDisciplina(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    location.reload();
  }

  goToTurmas(item)
  {
    this.router.navigate([`curso/${item.curso.id}/disciplina/${item.disciplina.id}/curso-disciplina/${item.id}/add-turmas`]);
  }
}
