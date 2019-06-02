import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetodologiaEnsino } from './metodologia-ensino';

@Injectable()
export class MetodologiaEnsinoService {

  private metodologiaEnsinoRoot = 'https://admfacens-web.herokuapp.com/';

  constructor(private http: HttpClient) { }
  
  getMetodologiasEnsino()
  {
    return this.http.get(this.metodologiaEnsinoRoot.concat('metodologia-ensino/'));
  }

  showOneMetodologiaEnsino(id: number)
  {
    return this.http.get(this.metodologiaEnsinoRoot.concat(`metodologia-ensino/${id}/`));
  }

  createMetodologiaEnsino(description: string, cursoDisciplina_id: number) {
    return this.http.post(this.metodologiaEnsinoRoot.concat('metodologia-ensino/'), {description, cursoDisciplina_id});
  }

  updateMetodologiaEnsino(id: number, description: string, cursoDisciplina_id: number)
  {
    return this.http.put(this.metodologiaEnsinoRoot.concat(`metodologia-ensino/${id}/`), {description, cursoDisciplina_id})
  }

  deleteMetodologiaEnsino(id: number) {
    return this.http.delete(this.metodologiaEnsinoRoot.concat(`metodologia-ensino/${id}/`));
  }
}
