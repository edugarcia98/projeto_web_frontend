import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objetivo } from '../objetivo/objetivo';
import { Curso } from '../curso/curso'

@Injectable()
export class CursoObjetivoService {

  private cursoObjetivoRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getCursosObjetivo()
  {
    return this.http.get(this.cursoObjetivoRoot.concat('curso-objetivo/'));
  }

  createCursoObjetivo(curso: Curso, objetivo: Objetivo)
  {
    return this.http.post(this.cursoObjetivoRoot.concat('curso-objetivo/'), {curso, objetivo})
  }
}
