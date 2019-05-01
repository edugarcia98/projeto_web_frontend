import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Turma } from './turma';

@Injectable()
export class TurmaService {

  private turmaRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getTurmas()
  {
    return this.http.get(this.turmaRoot.concat('turma/'));
  }

  showOneTurma(id: number)
  {
    return this.http.get(this.turmaRoot.concat(`turma/${id}/`));
  }

  createTurma(codigo: string, cursoDisciplina_id: number) {
    return this.http.post(this.turmaRoot.concat('turma/'), {codigo, cursoDisciplina_id});
  }

  updateTurma(id: number, codigo: string, cursoDisciplina_id: number)
  {
    return this.http.put(this.turmaRoot.concat(`turma/${id}/`), {codigo, cursoDisciplina_id})
  }

  deleteTurma(id: number) {
    return this.http.delete(this.turmaRoot.concat(`turma/${id}/`));
  }
}
