import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CursoDisciplinaTurma } from './curso-disciplina-turma';

@Injectable()
export class CursoDisciplinaTurmaService {

  private cursoDisciplinaTurmaRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getCursosDisciplinaTurmas() {
    return this.http.get(this.cursoDisciplinaTurmaRoot.concat('curso-disciplina-turma'));
  }

  createCursoDisciplinaTurma(cursoDisciplina_id: number, turma_id: number) {
    return this.http.post(this.cursoDisciplinaTurmaRoot.concat('curso-disciplina-turma/'), { cursoDisciplina_id, turma_id });
  }
}
