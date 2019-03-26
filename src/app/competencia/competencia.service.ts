import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competencia } from './competencia'

@Injectable()
export class CompetenciaService {

  private competenciaRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getCompetencias() {
    return this.http.get(this.competenciaRoot.concat('competencia/'));
  }

  showOneCompetencia(id: number)
  {
    return this.http.get(this.competenciaRoot.concat(`competencia/${id}/`));
  }

  createCompetencia(title: string, description: string) {
    return this.http.post(
      this.competenciaRoot.concat('competencia/'),
      { title, description }
    );
  }

  updateCompetencia(id: number, title: string, description: string)
  {
    return this.http.put(this.competenciaRoot.concat(`competencia/${id}/`), {title, description})
  }

  deleteCompetencia(id: number) {
    return this.http.delete(this.competenciaRoot.concat(`competencia/${id}/`));
  }
}
