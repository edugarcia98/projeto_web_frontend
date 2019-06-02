import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objetivo } from './objetivo';
import { Curso } from '../curso/curso'

@Injectable()
export class ObjetivoService {

  private objetivoRoot = 'https://admfacens-web.herokuapp.com/';

  constructor(private http: HttpClient) { }


  getObjetivos() {
    return this.http.get(this.objetivoRoot.concat('objetivo/'));
  }

  showOneObjetivo(id: number)
  {
    return this.http.get(this.objetivoRoot.concat(`objetivo/${id}/`));
  }

  createObjetivo(title: string, description: string, curso_id: number) {
    return this.http.post(this.objetivoRoot.concat('objetivo/'), {title, description, curso_id});
  }

  updateObjetivo(id: number, title: string, description: string, curso_id: number)
  {
    return this.http.put(this.objetivoRoot.concat(`objetivo/${id}/`), {title, description, curso_id})
  }

  deleteObjetivo(id: number) {
    return this.http.delete(this.objetivoRoot.concat(`objetivo/${id}/`));
  }
}
