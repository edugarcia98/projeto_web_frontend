import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CursoDisciplina } from './curso-disciplina';

@Injectable()
export class CursoDisciplinaService {

  private cursoDisciplinaRoot = 'https://admfacens-web.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getCursosDisciplina() {
    return this.http.get(this.cursoDisciplinaRoot.concat('curso-disciplina'));
  }

  showOneCursoDisciplina(id: number)
  {
    return this.http.get(this.cursoDisciplinaRoot.concat(`curso-disciplina/${id}/`));
  }

  createCursoDisciplina(curso_id: number, disciplina_id: number) {
    return this.http.post(this.cursoDisciplinaRoot.concat('curso-disciplina/'), { curso_id, disciplina_id });
  }

  deleteCursoDisciplina(id: number) {
    return this.http.delete(this.cursoDisciplinaRoot.concat(`curso-disciplina/${id}/`));
  }
}
