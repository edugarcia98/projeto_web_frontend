import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habilidade } from './habilidade';
import { Curso } from '../curso/curso';

@Injectable()
export class HabilidadeService {

  private habilidadeRoot = 'https://admfacens-web.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getHabilidades() {
    return this.http.get(this.habilidadeRoot.concat('habilidade/'));
  }

  showOneHabilidade(id: number)
  {
    return this.http.get(this.habilidadeRoot.concat(`habilidade/${id}/`));
  }

  createHabilidade(title: string, description: string, curso_id: number) {
    return this.http.post(this.habilidadeRoot.concat('habilidade/'), { title, description, curso_id });
  }

  updateHabilidade(id: number, title: string, description: string, curso_id: number)
  {
    return this.http.put(this.habilidadeRoot.concat(`habilidade/${id}/`), {title, description, curso_id});
  }

  deleteHabilidade(id: number) {
    return this.http.delete(this.habilidadeRoot.concat(`habilidade/${id}/`));
  }
}
