import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competencia } from './competencia';
import { Curso } from '../curso/curso';

@Injectable()
export class CompetenciaService {

  private competenciaRoot = 'https://admfacens-web.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getCompetencias() {
    return this.http.get(this.competenciaRoot.concat('competencia/'));
  }

  showOneCompetencia(id: number)
  {
    return this.http.get(this.competenciaRoot.concat(`competencia/${id}/`));
  }

  createCompetencia(title: string, description: string, curso_id: number) {
    return this.http.post(this.competenciaRoot.concat('competencia/'), { title, description, curso_id });
  }

  updateCompetencia(id: number, title: string, description: string, curso_id: number)
  {
    return this.http.put(this.competenciaRoot.concat(`competencia/${id}/`), {title, description, curso_id});
  }

  deleteCompetencia(id: number) {
    return this.http.delete(this.competenciaRoot.concat(`competencia/${id}/`));
  }
}
