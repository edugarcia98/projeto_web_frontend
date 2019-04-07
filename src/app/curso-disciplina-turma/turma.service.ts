import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Turma } from './turma';

@Injectable()
export class TurmaService {

  private turmaRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getTurmas() {
    return this.http.get(this.turmaRoot.concat('turma'));
  }

  createTurma(codigo: string) {
    return this.http.post(this.turmaRoot.concat('turma/'), { codigo });
  }
}
