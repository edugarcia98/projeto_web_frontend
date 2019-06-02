import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disciplina } from './disciplina';
import { TipoDisc } from './tipo-disc';


@Injectable()
export class DisciplinaService {

  private disciplinaRoot = 'https://admfacens-web.herokuapp.com/';

  constructor(private http: HttpClient) { }


  getDisciplinas() {
    return this.http.get(this.disciplinaRoot.concat('disciplina/'));
  }

  showOneDisciplina(id: number)
  {
    return this.http.get(this.disciplinaRoot.concat(`disciplina/${id}/`));
  }

  createDisciplina(title: string, tipo: string, creditos: number, ementa: string, professor_id: number) {
    return this.http.post(this.disciplinaRoot.concat('disciplina/'), { title, tipo, creditos, ementa, professor_id });
  }

  updateDisciplina(id: number, title: string, tipo: string, creditos: number, ementa: string, professor_id: number)
  {
    return this.http.put(this.disciplinaRoot.concat(`disciplina/${id}/`), {title, tipo, creditos, ementa, professor_id});
  }

  deleteDisciplina(id: number) {
    return this.http.delete(this.disciplinaRoot.concat(`disciplina/${id}/`));
  }
}
