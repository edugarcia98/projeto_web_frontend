import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objetivo } from './objetivo';
import { Curso } from '../curso/curso'

@Injectable()
export class ObjetivoService {

  private objetivoRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }


  getObjetivos() {
    return this.http.get(this.objetivoRoot.concat('objetivo/'));
  }

  showOneObjetivo(id: number)
  {
    return this.http.get(this.objetivoRoot.concat(`objetivo/${id}/`));
  }

  createObjetivo(title: string, description: string) {
    return this.http.post(
      this.objetivoRoot.concat('objetivo/'),
      { title, description }
    );
  }

  updateObjetivo(id: number, title: string, description: string)
  {
    return this.http.put(this.objetivoRoot.concat(`objetivo/${id}/`), {title, description})
  }

  deleteObjetivo(id: number) {
    return this.http.delete(this.objetivoRoot.concat(`objetivo/${id}/`));
  }
}
